/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // Analyze the user authentication state and 
  // pass the appropriate locals to the homepage view. 

  showHomePage: function (req, res) {
    
  // If the user is NOT authenticated, return the homepage
  // with the me property in locals set to null.

    if (!req.session.me) {
      return res.view('homepage', {
        me: null
      });
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage', {
          me: null
        });
      }

      return res.view('homepage', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  showAdminPage: function (req, res) {
    // If no session detected redirect to the homepage.
      
    if (!req.session.me) {
      return res.redirect('/');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){

      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      if (user.admin) {
        return res.view('adminUsers', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      } else {
        return res.view('homepage', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL
          }
        });
      }
    });
  },

  showVideosPage: function (req, res) {
    
  // // If not logged in, show the public view.
  //   if (!req.session.me) {
  //     return res.view('homepage', {me: req.session.me});
  //   }

  if (!req.session.me) {
    return res.view('videos', {
      me: null
    });
  }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('videos');
      }

      return res.view('videos', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  showProfilePage: function (req, res) {

    // If no session detected redirect to the homepage.
      
    if (!req.session.me) {
      return res.redirect('/');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('profile', {
        me: {
          id: user.id,
          email: user.email,
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

   showEditProfilePage: function (req, res) {

    // If no session detected redirect to the homepage.
      
    if (!req.session.me) {
      return res.redirect('/');
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('edit-profile', {
        me: {
          id: user.id,
          email: user.email,
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  showRestorePage: function (req, res) {
    if (req.session.me) {
      return res.redirect('/');
    }

    return res.view('restore', {
      me: null
    });
  },

  showSignupPage: function (req, res) {

    if (req.session.me) {
      return res.redirect('/');
    }

    return res.view('signup', {
      me: null
    });
  }
};
