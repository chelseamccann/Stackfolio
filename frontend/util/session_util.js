export const signup = (user) => {
    return $.ajax({
      method: "POST",
      url: "/users",
      data: { user }
    });
  };
  
  export const signin = (user) => {
    return $.ajax({
      method: "POST",
      url: "/session",
      data: { user }
    });
  };
  
  export const logout = () => {
    return $.ajax({
      method: "DELETE",
      url: "/session"
    })
  }