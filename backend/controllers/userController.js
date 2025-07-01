import {User }from "../models/userModel.js";

export const getUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await User.findOne({ userId: userId })
        if (!user) {
            return res.status(401).json({message: "User not found"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Error fetching user", error: error.message})
    }
}

export const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ userId: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Server error", details: error.message });
  }
};

export const getCart = async (req, res) => {
    const userId = req.user.userId
    try {
        const user = await User.findOne({ userId: userId }).populate(
            "cart.productId",
            "name images price stock brand"
        )
        if(!user) {
            return res.status(401).json({message: "User not found"})
        }
        res.status(200).json(user.cart)
    } catch (error) {
        res.status(500).json({message: "Error fetching cart", error: error.message})
    }
}

export const mergeCart = async (req, res) => {
    const { localCart } = req.body
    const userId = req.user.userId
    try {
        const user = await User.findOne({userId: userId})
        if (!user) {
            return res.status(401).json({message: "User not found"})
        }
        const serverCart = user.cart
        const mergedCart = [...serverCart]

        localCart.forEach((localItem) => {
            const existingItem = mergedCart.find((serverItem) => serverItem.productId === localItem.productId && serverItem.size === localItem.size)

            if (existingItem) {
                existingItem.amount += localItem.amount
            } else {
                mergedCart.push(localItem)
            }
        });
        user.cart = mergedCart
        await user.save()

        res.status(200).json({message: "cart merged successfully", cart: mergedCart})
    } catch (error) {
        res.status(500).json({message: "Server error", details: error.message})
    }
}

// const updateCart = async (req, res) => {
//     const { productId, value } = req.body
    
//     try {
//         const user = await User.findOne({ userId: req.user.userId })
//         if (!user) {
//             return res.status(401).json({message: "User not found", details: error.message})
//         }
//         const cartItem = user.cart.find(item => item.productId)
//     } catch (error) {
        
//     }
// } 