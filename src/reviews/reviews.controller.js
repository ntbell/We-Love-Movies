const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function idExists(req, res, next) {
    const review_id = req.params.reviewId;
    const review = await service.read(review_id);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res, next) {
    const newReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
    await service.update(newReview);

    const response = await service.read(res.locals.review.review_id);
    response["critic"] = await service.readCritic(res.locals.review.critic_id);

    res.json({ data: response });
}

async function destroy(req, res, next) {
    service
        .delete(res.locals.review.review_id)
        .then(() => {
            const message = `204 No Content`;
            return next({ status: 204, message: message });
        })
        .catch(next);
}

module.exports = {
    update: [asyncErrorBoundary(idExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(idExists), asyncErrorBoundary(destroy)],
}