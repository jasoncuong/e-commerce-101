const User = require("../models/user");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const makeToken = require("uniqid");

//REGISTER
// const register = async (req, res) => {
//   try {
//     const { email, password, firstname, lastname } = req.body;

//     if (!email || !password || !firstname || !lastname) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing inputs" });
//     }

//     const user = await User.findOne({ email: email });
//     if (user) {
//       res.status(400).json({
//         success: false,
//         message: "User already exist",
//       });
//     } else {
//       const newUser = await User.create(req.body);
//       return res.status(200).json({
//         success: newUser ? true : false,
//         message: newUser ? "Register Successfully!" : "Something went wrong",
//         newUser,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

//REGISTER
const register = async (req, res) => {
  try {
    const { email, password, firstname, lastname, mobile } = req.body;
    if (!email || !password || !firstname || !lastname || !mobile) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    } else {
      const token = makeToken();
      const emailEdited = btoa(email) + "@" + token;
      const newUser = await User.create({
        email: emailEdited,
        password,
        firstname,
        lastname,
        mobile,
      });

      if (newUser) {
        const html = `<h2>Register code:</h2> <br/> <blockquote>${token}</blockquote>`;
        await sendMail({ email, html, subject: "Complete registration" });
      }

      setTimeout(async () => {
        await User.deleteOne({ email: emailEdited });
      }, [60000]);

      return res.status(200).json({
        success: newUser ? true : false,
        message: newUser
          ? "Please check your email to active your account"
          : "Something went wrong. Please try again later",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Final Register (Xác thực email)
const finalRegister = async (req, res) => {
  try {
    const { token } = req.params;
    const notActiveEmail = await User.findOne({
      email: new RegExp(`${token}$`),
    });
    if (notActiveEmail) {
      notActiveEmail.email = atob(notActiveEmail?.email?.split("@")[0]);
      notActiveEmail.save();
    }
    return res.status(200).json({
      success: notActiveEmail ? true : false,
      message: notActiveEmail
        ? "Register successfully. Please Login."
        : "Something went wrong. Please try again later.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing inputs" });
    }

    const response = await User.findOne({ email: email });

    if (response && (await response.isCorrectPassword(password))) {
      // Tách password và role ra khỏi response
      const { password, role, refreshToken, ...userData } = response.toObject();
      // Tạo accessToken (Xác thực ng dùng, phân quyền ng dùng)
      const accessToken = generateAccessToken(response._id, role);
      // Tạo refreshToken (Cấp mới accessToken)
      const newRefreshToken = generateRefreshToken(response._id);
      // Lưu refreshToken vào DB
      await User.findByIdAndUpdate(
        response._id,
        { refreshToken: newRefreshToken },
        { new: true }
      );

      // Lưu refreshToken vào Cookies
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "Login successfully!",
        accessToken,
        userData,
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Invalid email and/or password" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET CURRENT USER
const getCurrent = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select("-refreshToken -password");
    return res.status(200).json({
      success: user ? true : false,
      result: user ? user : "User not found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//GET ALL USER
const getUsers = async (req, res) => {
  try {
    const queries = { ...req.query };
    // Tách các trường đặc biệt ra khỏi query
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach((item) => delete queries[item]);

    //Format lại các operators cho đúng cứ pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (matchedEl) => `$${matchedEl}`
    );
    const formatedQueries = JSON.parse(queryString);

    //Filtering
    if (queries?.name) {
      formatedQueries.name = { $regex: queries.name, $options: "i" };
    }

    if (req.query.q) {
      delete formatedQueries.q;
      formatedQueries["$or"] = [
        { firstname: { $regex: req.query.q, $options: "i" } },
        { lastname: { $regex: req.query.q, $options: "i" } },
        { email: { $regex: req.query.q, $options: "i" } },
      ];
    }

    let queryCommand = User.find(formatedQueries);

    //Sorting
    if (req.query.sort) {
      //abc,efg => [abc,efg] => abc efg
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    //Fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    }

    //Pagination
    //limit: số object lấy về 1 lần gọi API
    //skip
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
    const skip = (page - 1) * limit;

    queryCommand = queryCommand.skip(skip).limit(limit);

    //Execute query
    //Số lượng sp thỏa mãn diều kiện !== số lượng sp trả về 1 lần gọi API
    queryCommand
      .then(async (response) => {
        const counts = await User.find(formatedQueries).countDocuments();

        return res.status(200).json({
          success: response ? true : false,
          counts,
          users: response ? response : "Cannot get products",
        });
      })
      .catch((err) => {
        return res.status(401).json({ success: false, message: err.message });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Refresh Access Token
const refreshAccessToken = async (req, res) => {
  try {
    //Lấy token từ cookies
    const cookie = req.cookies;
    //Check xem có token hay 0
    if (!cookie && !cookie.refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "No refresh token in cookie" });
    }
    //Check token có còn hạn hay 0
    jwt.verify(
      cookie.refreshToken,
      process.env.JWT_SECRET,
      async (err, decode) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid refresh token" });
        }
        //Check xem token này có khớp với token đã lưu trong DB hay 0
        const response = await User.findOne({
          _id: decode._id,
          refreshToken: cookie.refreshToken,
        });
        return res.status(200).json({
          success: response ? true : false,
          newAccessToken: response
            ? generateAccessToken(response._id, response.role)
            : "Refresh token not matched",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//LOG OUT
const logout = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "No refresh token in cookies",
      });
    }

    //Xóa refresh token ở DB
    await User.findOneAndUpdate(
      { refreshToken: cookie.refreshToken },
      { refreshToken: "" },
      { new: true }
    );

    //Xóa refresh token ở cookies trình duyệt
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });

    return res
      .status(200)
      .json({ success: true, message: "Logout successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//FORGOT PASSWORD
// Client gửi lên email
// Server check xem email có hợp lệ hay 0 => gửi mail cho client + kèm link (password change token)
// Client check email => click vào link
// Client gửi api kèm theo token
// Server check xem cái token có giống với cái token đã gửi hay 0
// Change password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Missing email",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = user.createPasswordChangeToken();
    await user.save();

    //
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/resetpassword/${resetToken}>Click here</a>`;

    const data = {
      email,
      html,
      subject: "Forgot password",
    };

    const rs = await sendMail(data);
    return res.status(200).json({
      success: rs.response?.includes("OK") ? true : false,
      message: rs.response?.includes("OK")
        ? "Please check your email!"
        : "Something went wrong. Please try later!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!password || !token) {
      return res.status(400).json({
        success: false,
        message: "Missing inputs",
      });
    }

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset token",
      });
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
      success: user ? true : false,
      message: user
        ? "Updated password successfully! Please Login"
        : "Updated password failed!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { _id } = req.query;

    if (!_id) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
      success: response ? true : false,
      deletedUser: response
        ? `User with email ${response.email} deleted`
        : `No user deleted`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE USER
const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }
    const response = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select("-password -role -refreshToken");
    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "Updated failed!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE USER BY ADMIN
const updateUserByAdmin = async (req, res) => {
  try {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }
    const response = await User.findByIdAndUpdate(uid, req.body, {
      new: true,
    }).select("-password -role -refreshToken");
    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "Updated failed!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE USER ADDRESS
const updateUserAddress = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!req.body.address) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { address: req.body.address } },
      {
        new: true,
      }
    ).select("-password -role -refreshToken");
    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "Updated failed!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//ADD TO CART
const updateCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { pid, quantity, color } = req.body;
    if (!pid || !quantity || !color) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }
    const user = await User.findById(_id).select("cart");
    const alreadyProduct = user?.cart?.find(
      (el) => el.product.toString() === pid
    );
    if (alreadyProduct) {
      if (alreadyProduct.color === color) {
        const response = await User.updateOne(
          { cart: { $elemMatch: alreadyProduct } },
          { $set: { "cart.$.quantity": quantity } },
          { new: true }
        );
        return res.status(200).json({
          success: response ? true : false,
          updatedUser: response ? response : "Updated failed!",
        });
      } else {
        const response = await User.findByIdAndUpdate(
          _id,
          {
            $push: { cart: { product: pid, quantity, color } },
          },
          { new: true }
        );
        return res.status(200).json({
          success: response ? true : false,
          updatedUser: response ? response : "Updated failed!",
        });
      }
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        {
          $push: { cart: { product: pid, quantity, color } },
        },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : "Updated failed!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  getUsers,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart,
  finalRegister,
};
