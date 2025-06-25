const asyncHandler = (asyncFunction) => {
    (req,res,next) => {
        Promise.resolve(
            asyncFunction(req,res,next)
        ).catch((err) =>{
            next(err)
        })
    }
}






export {asyncHandler} ;

// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             sucess : false,
//             message : err.message
//         })
//     }
// } 