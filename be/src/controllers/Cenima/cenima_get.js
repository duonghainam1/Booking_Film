import e from "express";
import Cenima from "../../models/cenima.js";
import { StatusCodes } from "http-status-codes";

export const cenima_get = async (req, res) => {
    const { _page = 1, _limit = 12, _search } = req.query;
    try {
        const option = {
            page: _page,
            limit: _limit,
            sort: { createdAt: -1 }
        }
        const query = {};
        if (_search) {
            query.name = { $regex: _search, $options: "i" }
        }
        const cenima = await Cenima.paginate(query, option);
        return res.status(StatusCodes.OK).json(cenima);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
export const cenima_get_by_id = async (req, res) => {
    const { id } = req.params;
    try {
        const cenimaId = await Cenima.findById(id);
        res.status(StatusCodes.OK).json(cenimaId);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
}