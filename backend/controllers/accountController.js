import  {User } from "../models/userModel.js";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from 'validator';
import { hashPassword, validatePasswordStrength } from "../utils/authUtils.js";
import { notify } from "../services/notificationService.js";
import { sendNewUserEmail } from "../utils/emailServices/sendNewUser.js";
dotenv.config();

const secret_key = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields must be filled"
        });
      }
      
      if (!validator.isEmail(email)) {
          return res.status(400).json({
              success: false,
              message: "Invalid email format"
          })
      }
      const passwordStrength = validatePasswordStrength(password)
      if (!passwordStrength) {
          return res.status(400).json({
              success: false,
              message: 'Password does noot meet requirements'
          })
      }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already in use"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userId: `user_${nanoid(6)}`,
      firstName,
      lastName,
      email,
        password: hashedPassword,
    });

    await newUser.save();

      const userResponse = { ...newUser.toObject() }
      delete userResponse.password;

      await sendNewUserEmail(userResponse)

       try {
              await notify.newSignUp(userResponse);
              } catch (error) {
                  console.error("Notification failed", error); 
              }
      res.status(201).json({
          success: true,
          message: "User created successfully",
          user: userResponse,
      });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
          .json({
             success: false, 
              message: "Email and password are required"
          });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    const token = jwt.sign(
      { id: user.userId, email: user.email, role: "user" },
      secret_key,
      { expiresIn: "7d" }
      );
      
      const userResponse = { ...user.toObject() }
      delete userResponse.password
      delete userResponse.__v

      res.status(200).json({
          success: true,
          user: userResponse, token, message: "Login succesful"
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteUser = async (req, res) => {
    try {
      
        const {userId} = req.params
      const user =  await User.findOneAndDelete({ userId: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        //cleanup user orders and so on
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const allUsers = async (req, res) => {
    try {
      
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit


        const users = await User.find({}, { password: 0, __v: 0 })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        
        const totalUsers = await User.countDocuments()

        res.status(200).json({
            success: true,
            count: users.length,
            total: totalUsers,
            page,
            pages: Math.ceil(totalUsers / limit),
            users
        });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.userId;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new password are required",
      });
    }

    const strengthCheck = validatePasswordStrength(newPassword);
    if (!strengthCheck.isValid) {
      return res.status(400).json({
        success: false,
        message: "New password does not meet requirements",
        requirements: strengthCheck.requirements,
      });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword
    // user.tokenVersion = (user.tokenVersion || 0) + 1;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({
      success: false,
      message: "Error changing password",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Valid email is required",
      });
    }

    const user = await User.findOne({ email });
      if (!user) {
        //dont reveal if email exists
      return res.json({
        success: true,
        message: "If this email exists, a reset link has been sent",
      });
      }
      
      const resetToken = jwt.sign(
          { id: user.userId, action: "password_reset" },
          secret_key,
          {expiresIn: "1h"}
      )
      
      //in production, send email with reset link
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      res.json({
        success: true,
        message: "Password reset link sent",
        ...(process.env.NODE_ENV === "development" && { token: resetToken }),
      });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing forgot password request",
    });
  }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body
        if (!token || !newPassword) {
            return res.status(404).json({
                success: false,
                message: "Token and new password are required"
            })
        }

        const decoded = jwt.verify(token, secret_key)
        if (decoded.action !== "password_reset") {
            return res.status(400).json({
                success: false,
                message: 'Invalid token type'
            })
        }

        const strengthCheck = validatePasswordStrength(newPassword)
        if (!strengthCheck.isValid) {
            return res.status(400).json({
                success: false,
                message: 'New password does not meet requirements',
                requirements: strengthCheck.requirements
            })
        }

        const user = await User.findOne({ userId: decoded.id })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        user.password = await hashPassword(newPassword)
        await user.save()

        res.json({
            success: true,
            message: 'Password reset successful'
        })
    } catch (error) {
        let message = "Error resetting password";
        let statusCode = 500;

        if (error instanceof jwt.TokenExpiredError) {
          message = "Password reset link has expired";
          statusCode = 400;
        } else if (error instanceof jwt.JsonWebTokenError) {
          message = "Invalid reset token";
          statusCode = 400;
        }

        console.error("Reset password error:", error);
        res.status(statusCode).json({
          success: false,
          message,
        });
    }
}

// Get user profile
export const getProfile = async(req, res) => {
   try {
     const user = await User.findOne({userId: req.user.userId}).select("-password -__v");

     if (!user) {
       return res
         .status(404)
         .json({ success: false, message: "User not found" });
     }

     res.status(200).json({
       success: true,
       user,
     });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
}

// Update user profile (names and phone no)
export const updateProfile = async(req, res) => {
   try {
     const { firstName, lastName, phoneNo } = req.body;

     const updateData = {};
     if (firstName) updateData.firstName = firstName.trim();
     if (lastName) updateData.lastName = lastName.trim();
     if (phoneNo && Array.isArray(phoneNo)) {
       // Validate phone numbers
       const validPhoneNumbers = phoneNo.filter((phone) =>
         validator.isMobilePhone(phone.toString(), "en-NG")
       );
       updateData.phoneNo = validPhoneNumbers;
     }

     const user = await User.findOneAndUpdate({userId: req.user.userId}, updateData, {
       new: true,
       runValidators: true,
     }).select("-password -__v");

     res.status(200).json({
       success: true,
       message: "Profile updated successfully",
       user,
     });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
}

// Get all addresses
export const getAllAddresses = async (req, res) => {
    try {
      const user = await User.findOne({userId: req.user.userId}).select("address");

      res.json({
        success: true,
        addresses: user.address || [],
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
} 

// Add new address
export const addNewAddress = async (req, res) => {
    try {
      const addressData = req.body;
      

      // Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "phoneNo",
        "street",
        "city",
        "state",
      ];
      const missingFields = requiredFields.filter(
        (field) => !addressData[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      // Validate phone number
      if (!validator.isMobilePhone(addressData.phoneNo.toString(), "en-NG")) {
        return res.status(400).json({
          success: false,
          message: "Invalid phone number format",
        });
      }

      // Validate additional phone number if provided
      if (
        addressData.additionalPhoneNo &&
        !validator.isMobilePhone(
          addressData.additionalPhoneNo.toString(),
          "en-NG"
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid additional phone number format",
        });
      }

      const user = await User.findOne({userId: req.user.userId});

      // If this is the first address, set it as default
      if (user.address.length === 0) {
        addressData.isDefault = true;
      }

      // If setting as default, remove default from other addresses
      if (addressData.isDefault) {
        user.address.forEach((addr) => {
          addr.isDefault = false;
        });
      }

      user.address.push(addressData);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Address added successfully",
        addresses: user.address,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
} 


// Update user address
export const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const addressData = req.body;

    const user = await User.findOne({userId: req.user.userId});
    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Validate phone numbers if provided
    if (
      addressData.phoneNo &&
      !validator.isMobilePhone(addressData.phoneNo.toString(), "en-NG")
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format",
      });
    }

    if (
      addressData.additionalPhoneNo &&
      !validator.isMobilePhone(
        addressData.additionalPhoneNo.toString(),
        "en-NG"
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid additional phone number format",
      });
    }

    // If setting as default, remove default from other addresses
    if (addressData.isDefault) {
      user.address.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    // Update the address
    user.address[addressIndex] = {
      ...user.address[addressIndex].toObject(),
      ...addressData,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      addresses: user.address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


// Delete user address
export const deleteAddress = async (req, res) => {
    try {
      const { addressId } = req.params;

      const user = await User.findOne({userId: req.user.userId});
      const addressIndex = user.address.findIndex(
        (addr) => addr._id.toString() === addressId
      );

      if (addressIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Address not found" });
      }

      const wasDefault = user.address[addressIndex].isDefault;

      // Remove the address
      user.address.splice(addressIndex, 1);

      // If we deleted the default address and there are other addresses, set a new default
      if (wasDefault && user.address.length > 0) {
        user.address[0].isDefault = true;
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: "Address deleted successfully",
        addresses: user.address,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}

// Set a default address
export const setDefaultAddress = async (req, res) => {
   try {
     const { addressId } = req.params;

     const user = await User.findOne({userId: req.user.userId});

     // Remove default from all addresses
     user.address.forEach((addr) => {
       addr.isDefault = false;
     });

     // Set the specified address as default
     const addressIndex = user.address.findIndex(
       (addr) => addr._id.toString() === addressId
     );

     if (addressIndex === -1) {
       return res
         .status(404)
         .json({ success: false, message: "Address not found" });
     }

     user.address[addressIndex].isDefault = true;
     await user.save();

     res.status(200).json({
       success: true,
       message: "Default address updated successfully",
       addresses: user.address,
     });
   } catch (error) {
     res.status(500).json({ success: false, message: error.message });
   }
}
