// there are may asynchronous errros and to mamage them, we need to add try catch blocks. But writting try-catch in each
// of the controller functions is not ideal. So we wrap the controller functions like createproduct or getProduct or deleteProduct
// inside the exported catchyAsync as exports.createProduct = catchasync ((req, res, next) => {}). So now the follwing function
// gets the complete createproduct or deleteProduct function. So now using the resolve function of Promise class, first the
// program tries to resolve the asynchronous function which is just like the try block and if there is an error, then catch
// block is executed which calls next and so passes on the execution to the errorHandler module.
module.exports = (catchAsync) => (req, res, next) => {
  Promise.resolve(catchAsync(req, res, next)).catch(next);
};
