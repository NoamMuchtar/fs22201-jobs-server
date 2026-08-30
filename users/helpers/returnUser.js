const returnUser = (user) => {
  return {
    _id: user._id,

    name: {
      first: user.name.first,
      middle: user.name.middle,
      last: user.name.last,
    },

    phone: user.phone,

    email: user.email,

    image: {
      url: user.image.url,
      alt: user.image.alt,
    },

    address: user.address,

    isRecruiter: user.isRecruiter,

    isAdmin: user.isAdmin,
  };
};

module.exports = returnUser;
