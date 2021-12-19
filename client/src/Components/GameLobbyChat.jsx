const GameLobbyChat = ({ messages, endToMessages, username }) => {

  return (
    <div className="game-lobby-chat">
      {messages.map(({ user, text }, key) => {
        const selfMessage = user === username ? "game-lobby-chat--self" : null;
        return (
          <div className={`game-lobby-chat__messages ${selfMessage}`} key={key}>
            {/*  <div className="game-lobby-chat__user">{user}</div> */}
            <div className="game-lobby-chat__message">{text}</div>
            <div ref={endToMessages}></div>
          </div>
        );
      })}
    </div>
  );
};

export default GameLobbyChat;
