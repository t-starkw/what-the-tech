const router = require('express').Router();
const { User, Post } = require('../../models');

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: { name: username }
    })
    if (!user) {
        res.status(404).json({ message: "User not found"})
    } else {
        if (user.checkPassword(password)) {
            // CORRECT password
            req.session.user_id = user.id
            req.session.logged_in = true
            console.log(`Welcome, ${username}`);
        } else {
            // INCORRECT password
            res.json({message:"Password is incorrect"})
        }
    }
})

// Create a new user
router.post('/', (req, res) => {
    User.create({
      name: req.body.username,
      password: req.body.password
    })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.name = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Get user by ID
router.get('/:id', async (req, res) => {
    try{
        const result = await User.findByPk(req.params.id, {
            attributes: {
                exclude: ["password"]
            },
            include: [{"model":Post}]
        });
        if (result) {
            const user = result.get({plain:true});
            res.status(200).json(user);
        } else {
            res.status(404).json({"error": "User not found"});
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
})

// Get all users
router.get('/', async (req, res) => {
    try{
        const result = await User.findAll({
            attributes: {
                exclude: ["password"]
            }
        });
        const users = result.map((user) => {
            return user.get({plain: true})
        })
        res.status(200).json(users);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

// Update user
router.put('/:id', async (req, res) => {
    try {
        const result = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!result) {
            res.status(404).json({"message": "User not found"})
        }
        res.status(200).json(result);

    }
    catch(err) {
        res.status(500).json(err);
    }
})

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const result = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!result) {
            res.status(404).json({"message": "User not found"})
        }
        res.status(200).json(result);

    }
    catch(err) {
        res.status(500).json(err);
    }
})

// User Logout
router.post('/logout', async (req, res) => {
    req.session.destroy()
    res.json({message:"Logged out"})
})




module.exports = router;