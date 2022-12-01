const TypePokemonService = require("../services/typePokemon.service");
const ApiError = require("../api-error");

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        documents = await TypePokemonService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tìm tất cả pokemon!!")
        );
    }
    return res.send(documents);

}

///
exports.create = async (req, res, next) => {
    if (!req.body?.type) {
        return next(new ApiError(400, " hệ pokemon không được để trống!!"));
    }
    try {
        const document = await TypePokemonService.create({
            type: req.body.type,

        })
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo hệ pokemon!!")
        );
    }

};
exports.findById = async (req, res, next) => {
    try {
        const document = await TypePokemonService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy hệ Pokemon"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Không tìm thấy hệ Pokemon có id=${req.params.id}`)
        )
    }
};
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cần cập nhật không thể rỗng!!"));
    }
    try {
        const document = await TypePokemonService.update(req.params.id, req.body);
        console.log(document);
        if (!document) {
            return next(new ApiError(404, "Không thể tìm thấy"));
        }
        return res.send({ message: "Cập nhật Pokemon thành công!!" });
    } catch (error) {
        return next(
            new ApiError(500, `Lỗi cập nhật Pokemon có id=${req.params.id}`)
        );
    }

};