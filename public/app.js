const app = angular.module('hamhero_app', []);
app.controller('mainController', ['$http', function($http) {

    this.message= "Hello from ANGULAR!"
    this.hampsters = [];

    this.URL = 'http://localhost:3000';
    this.formData = {};
    const controller = this;
    const edit_form = false;

    // localStorage.clear('token');


    //read all the Blogs -- /blogs GET index
    //anyone can do this!!!
    this.getHampsters = function (){
      $http({
        method: 'GET',
        url: this.URL + '/hampsters'
        // url: this.herokuURL
      }).then(function(result) {
          console.log('hampsters from api: ', result);
          this.hampsters = result.data;
          // this.logout();
      }.bind(this), function(error) {
          console.log(error);
      });
    }

    // Login User to get JWT Token for
    // post - update - delete
    this.login = function(userLogin) {
      console.log('The userLogin.username & userLogin.password ' + userLogin.username + ' : ' + userLogin.password)
      this.userLogin = userLogin;
      $http({
          method: 'POST',
          url: this.URL + '/users/login',
          data: { username: userLogin.username, password: userLogin.password },
        }).then(function(response) {
          console.log(response);
          this.user = response.data.user;
          localStorage.setItem('token', JSON.stringify(response.data.token));
        }.bind(this));
    }

    this.register = function(userRegister) {
      console.log('The userRegister.username & userRegister.password ' + userRegister.username + ' : ' + userRegister.password)
      this.userRegister = userRegister;
      $http({
          method: 'POST',
          url: this.URL + '/users',
          data: { username: userRegister.username, password: userRegister.password },
        }).then(function(response) {
          console.log(response);
          this.user = response.data.user;
          localStorage.setItem('token', JSON.stringify(response.data.token));
        }.bind(this));
    }

    // List the users as an Index
    // only logged in users see the users index
    // this.users = function() {
    //   console.log('/USERS called')
    //   $http({
    //     method: 'GET',
    //     url: this.URL + '/users',
    //     headers: {
    //       Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    //     }
    //   }).then(function(response) {
    //       console.log('users from api: ', response);
    //       if (response.data.status == 401) {
    //         this.error = "Unauthorized";
    //       } else {
    //         this.users = response.data.user;
    //       }
    //   }.bind(this), function(error) {
    //       console.log('GET /users ERROR ' + error);
    //   }.bind(this));
    // }

    //Logout current user and delete JWT Token
    this.logout = function() {
      localStorage.clear('token');
      location.reload();
    }


    this.processForm = () => {
      console.log('process form is running');
      console.log('here is the form data: ', this.formData);
      $http({
        method: 'POST',
        url: this.URL + '/hampsters',
        data: this.formData,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response){
        console.log(response);
        this.hampsters.unshift(response.data);
      }.bind(this), function(error) {
        console.log(error);
    });

    }

    this.deleteHampster = function(hampster){
      console.log('this is my hampster id', hampster.id);
      $http({
        method: 'DELETE',
        url: this.URL + '/hampsters/' + hampster.id,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(
        function(response){
          controller.getHampsters();
        },
        function (){
        }

      );
    }

    this.showHampsterOwner = function (user_id) {
        console.log("showHampsterOwner clicked for user ", user_id);
        $http({
          method: 'GET',
          url: this.URL + '/hampsters/' + user_id,
          headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
          }
        }).then(function(response){
            console.log(response.data)
            this.hampsters = response.data;
          }.bind(this), function(error) {
              console.log(error);
          });
    };

    this.editHampster = function (hampster) {
      console.log('Edit hampster called!')
      console.log('hampster.id ', hampster.id)

      // console.log('this.editForm.name ', this.editForm.name)
      // console.log('this.editForm.color ', this.editForm.color)
      // console.log('this.editForm.victory_points ', this.editForm.victory_points)

      $http({
        method: 'PUT',
        url: this.URL + '/hampsters/' + hampster.id,
        data: this.editForm,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      }).then(function(response){
          console.log(response.data)
          // this.hampsters = response.data;
          controller.getHampsters();
        }, function(error) {
            console.log(error);
        });

      // hide the form
      controller.edit_form = false;
    };


    // show the index of all the hampsters on the initial page
    this.getHampsters();
  }]);
