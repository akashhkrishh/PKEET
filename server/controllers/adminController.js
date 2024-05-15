const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const AdminUser = await Admin.findOne({ email });

        if (AdminUser) {
            return res.status(400).json({ message: 'email is already taken.' });
        }

        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new Admin({ name, email, password:hashpassword, role: "Admin" });
        const savedUser = await newUser.save();
        res.status(201).json({message:"Admin Registered Successful!"});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const AdminUser = await Admin.findOne({ email });

        if (!AdminUser) {
            return res.status(400).json({ message: 'The email address not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, AdminUser.password);

        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid name or password.' });
        }

        const token = jwt.sign({ email: AdminUser.email, role: AdminUser.role }, process.env.PRIVATE_KEY);
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};