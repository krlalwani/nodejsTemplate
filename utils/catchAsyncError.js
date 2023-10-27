//catch function to replace try/catch block for each async functions
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// catchAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// };

// module.exports = catchAsync;
