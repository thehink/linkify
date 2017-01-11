<?php
namespace app\controllers;

/**
 *
 */
class User
{

    static function getUserInfo($params, $user){
        return [
            'id' => $user->id,
            'user' => $user
        ];
    }
    static function logout($params, $user){
        $token = \Authentication::getToken();
        $token->_delete();
    }

    static function register(){
        $postBody = get_json_body(true);

        $errors = \FormValidator::validate($postBody,
          [
              'email' => 'required|email',
              'password' => 'required|password',
              'username' => 'required|string'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }

        $username = $postBody['username'];
        $password = $postBody['password'];
        $email = $postBody['email'];

        try {
            \app\stores\User::add($username, $password, $email);
        } catch (Exception $e) {
            throw new \ApiException('Couldn\'t add user for some reason', 400);
        }

        return;
    }

    static function login(){
        $postBody = get_json_body(true);

        $errors = \FormValidator::validate($postBody,
          [
              'username' => 'required|string',
              'password' => 'required|password'
          ]);

        if($errors){
            throw new \ApiException('FormError', 400, $errors);
        }

        $username = $postBody['username'];
        $password = $postBody['password'];

        try {
            $token = \Authentication::login($username, $password);
            if(!$token){
                throw new \ApiException('Couldn\'t login for some reason', 400);
            }

            $user = \app\stores\User::getFullUserInfo($token->user_id);

            return [
                'id' => $token->user_id,
                'user' => $user,
                'token' => $token->toString()
            ];

        } catch (\ApiException $e) {
            throw new \ApiException('FormError', 400, ['_error' => 'Wrong username or password']);
        } catch (Exception $e) {
            throw new \ApiException('Couldn\'t login for some reason', 400);
        }


    }
}
