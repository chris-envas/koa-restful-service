const Router = require("koa-router");
const router = new Router({prefix: '/users'});
const { 
    find, 
    findById, 
    create, 
    update, 
    delete: deleteUser, 
    login,
    follow,
    listFollowing,
    unfollow,
    listFollowers
} = require("../controllers/users");
const { checkOwner, checkUserExist } = require("../middlers/middlers");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/", find);

router.post("/", create);

router.get("/:id", findById);

router.patch("/:id", auth, checkOwner, update);

router.delete("/:id", auth, checkOwner, deleteUser);

router.post("/login", login);

router.put("/following/:id", auth, checkUserExist, follow);

router.delete("/following/:id", auth, checkUserExist, unfollow);

router.get("/:id/following", listFollowing);

router.get("/:id/followers", listFollowers);

module.exports = router;