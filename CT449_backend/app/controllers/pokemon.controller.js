
const PokemonService = require("../services/pokemon.service");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Tên pokemon không được để trống!!"));
    }
    try {
        const document = await PokemonService.create({
            name: req.body.name,
            img: req.body.img,
            types: req.body.types,
            hp: req.body.hp,
            att: req.body.att,
            speed: req.body.speed,

        })
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tạo pokemon!!")
        );
    }

};

exports.findById = async (req, res, next) => {
    try {
        const document = await PokemonService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không tìm thấy Pokemon"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Không tìm thấy Pokemon có id=${req.params.id}`)
        )
    }
};

// //Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name, type } = req.query;
        if (name) {
            documents = await PokemonService.findByName(name);
        } else if (type) {
            documents = await PokemonService.findByType(type);
        } else {
            documents = await PokemonService.find({});

        }
    } catch (error) {
        return next(
            new ApiError(500, "Đã xảy ra lỗi khi tìm tất cả pokemon!!")
        );
    }
    return res.send(documents);

}
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Dữ liệu cần cập nhật không thể rỗng!!"));
    }
    try {
        const document = await PokemonService.update(req.params.id, req.body);
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
exports.delete = async (req, res, next) => {
    try {
        const document = await PokemonService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Không thể tìm thấy"));
        }
        return res.send({ message: "Xóa Pokemon thành công!!" });
    } catch (error) {
        return next(
            new ApiError(500, `Không thể xóa Pokemon có id=${req.params.id}`)
        );
    }
};
exports.deleteAll = async (_req, res, next) => {
    try {
        const deleteCount = await PokemonService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while removing all contacts")
        );
    }
};
