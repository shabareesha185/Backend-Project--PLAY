import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    const { fullName, email, username, password } = req.body;
    // console.log(fullName);
    // console.log(email);
    // console.log(username);
    // console.log(password);
    if (
        // [fullName, email, username, password].some((field) => field?.trim() === "")
       !fullName || !email || !username || !password
    ) {
        throw new ApiError(400, "All User Fields are Required");
    }

    // check if user already exists: username, email
    const exsistedUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (exsistedUser) {
        throw new ApiError(409, "username or email already exsist");
    }

    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    // console.log("Req: ",req);
    // console.log("Req.body: ",req.body);
    // console.log("Req.files: ",req.files);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    // console.log("Avatar: ", avatar);
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email,
        password,
    });

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the User");
    }

    // return res
    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
