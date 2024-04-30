import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: false, message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ status: false, message: 'You are not authenticated!' });
  }
};

export const verifyTokenAndAuthorization = async (req, res, next) => {
  verifyToken(req, res, () => {
    // 'Client', 'Vendor', 'Driver', 'Admin'
    if (
      req.user.userType === 'Client' ||
      req.user.userType === 'Vendor' ||
      req.user.userType === 'Driver' ||
      req.user.userType === 'Admin'
    ) {
      next();
    } else {
      return res.status(403).json({ status: false, message: 'Access Denied!' });
    }
  });
};

export const verifyVendor = async (req, res, next) => {
  verifyToken(req, res, () => {
    // 'Vendor', 'Admin'
    if (req.user.userType === 'Vendor' || req.user.userType === 'Admin') {
      next();
    } else {
      return res.status(403).json({ status: false, message: 'Access Denied!' });
    }
  });
};

export const verifyDriver = async (req, res, next) => {
  verifyToken(req, res, () => {
    // 'Driver', 'Admin'
    if (req.user.userType === 'Driver' || req.user.userType === 'Admin') {
      next();
    } else {
      return res.status(403).json({ status: false, message: 'Access Denied!' });
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    // 'Admin'
    if (req.user.userType === 'Admin') {
      next();
    } else {
      return res.status(403).json({ status: false, message: 'Access Denied!' });
    }
  });
};
