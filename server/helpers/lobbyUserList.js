class lobbyUserList {
  constructor() {
    this.userList = [];
  }

  addUser({ userId, userRoom, userName }) {
    const existingRoom = this.userList.find(
      (user) => user.userName === userName
    );

    if (!existingRoom) {
      const user = { userId, userRoom, userName };
      this.userList.push(user);
    }
  }

  removeUser(userId) {
    const filteredArray = this.userList.filter(
      (user) => user.userId !== userId
    );
    console.log("filtered Array",filteredArray)
    this.userList = [...filteredArray];
  }
}

export default lobbyUserList;
