import axios from "axios";

export const Base_Url = "http://localhost:3003"

//register user endpoint
export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
    console.log(fullName)
    try{
           const result = await axios.post(`${Base_Url}/auth/registerUser`, {
             fullName,
             email,
             password,
           });
           console.log(result);
           return result.data;
    } catch(error) {
        console.log(error)
    }
     
};

// user signIn endpoint
export const signIn = async (
    email: string, 
    password: string,
) => {
    const result = await axios.post(`${Base_Url}/auth/signIn`, {email, password});
    localStorage.setItem('accessToken', result.data.accessToken)
    const accessToken = result.data.accessToken;
    const userData = { user: result.data.user, accessToken };
    console.log(result);
    return userData;
} 

// fetchAllusers endpoint
export const getUsers = async (user: string) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${user}`
        }
    }
    const result = await axios.get(`${Base_Url}/auth/fetchUsers`, config)
    return result.data
}
