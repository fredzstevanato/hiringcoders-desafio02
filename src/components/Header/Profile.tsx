import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

interface ProfileProps {
  showProfileData?: boolean;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

const {REACT_APP_GOOGLE_ID} = process.env;

export function Profile({ showProfileData = true }: ProfileProps) {
  const [user, setUser] = useState<User>();

  const userLocalStorage = localStorage.getItem('@commerce-user')

  useEffect(() => {
    if(userLocalStorage) {
      const userExists = JSON.parse(userLocalStorage) as User;
      
      const u: User = {
        name: userExists.name,
        avatar: userExists.avatar,
        email: userExists.email
      }

      setUser(u)
    }
  }, [userLocalStorage, user])

  function logout() {
    localStorage.removeItem('@commerce-user');
    setUser(null);
  }

  const responseGoogle = async (response: GoogleLoginResponse) => {
    const { name, email, imageUrl} = response.profileObj;
  
   localStorage.setItem('@commerce-user', JSON.stringify({
     name, email, avatar: imageUrl
   }))
  }

  return (
    <Flex align="center" ml="10">
      { user && (
        <>
        <Box mr="4" textAlign="right">
          <Text>{ user ? user.name : ''}</Text>
          <Text color="gray.300" fontSize="small">
            { user ? user.email : ''}
          </Text>
        </Box>

        <Avatar size="md" name={ user ? user.name : ''} src={ user ? user.avatar : ''}/>
        </>
      )}
      { !user ? (
        <GoogleLogin
        clientId={`${REACT_APP_GOOGLE_ID}`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
  />
      ) : (
        <Button
          onClick={() => logout()}
          bg="green.500"
          ml="10"
        >
          Sair
        </Button>
      ) }
    </Flex>
  );
}