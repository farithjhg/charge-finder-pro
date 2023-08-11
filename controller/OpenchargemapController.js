const asyncHandler = require('express-async-handler')
const Openchargemap = require('../schemas/openchargemapSchema');
const { openChargeMapService } = require('../service')
// @desc Get All Points
// @route   GET /api/points
// @access  Private
const getAllPoints = asyncHandler(async (req, res) => {
    const { page, elements } = req.query;
    if (!page || !elements) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const numberElements = await Openchargemap.countDocuments({}).exec();
    const totalPages = 50;
    const skip = (page - 1) * elements

    const entities = await openChargeMapService.findAllPaginated(skip, elements);

    const response = {
        currentPage: page,
        numberElements,
        totalPages,
        data: entities,
      };
    res.status(200).json(response);
});

/*
getTotalPages(totalElements, elementsPerPage) {
    if (elementsPerPage <= 0) return 1;

    const remainder = totalElements % elementsPerPage;
    if (remainder === 0) {
      return totalElements / elementsPerPage;
    } else {
      return Math.trunc(totalElements / elementsPerPage) + 1;
    }
  }
*/

module.exports = {
    getAllPoints
  };
  