import { useState, useRef, useEffect } from "react";
import { FaLeaf } from "react-icons/fa";
import { GiMonsteraLeaf } from "react-icons/gi";

const Chat = ({ messages, trenutniUser, onSendMessage }) => {
  const scroll = useRef();
  const [text, setText] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    onSendMessage(text);
    setText("");
  };

  const handleMessageChange = (e) => {
    setText(e.target.value);
  };

  /* Izvor za scrollToElement: https://codingbeautydev.com/blog/react-scroll-to-element-after-render/ */

  const scrollToElement = () => {
    scroll.current.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(() => {
    scrollToElement();
  }, [messages]);

  return (
    <div className="chat">
      <ul className="poruke-box">
        {messages.length > 0
          ? messages.map((message, index) => {
              const { user, text } = message;
              console.log(user);
              const myMessage = user.id === trenutniUser.id;
              const className = myMessage ? "poruka mojaPoruka" : "poruka";

              return (
                <li className={className} key={index}>
                  <span
                    className="avatar"
                    style={{ backgroundColor: user.color }}
                  >
                    {/* Za ikone su namjerno odabrane samo dvije, jedna je uvijek na lijevo, a druga na desnoj strani i nisu vezane uz usera */}
                    {myMessage ? (
                      <FaLeaf className="icon" />
                    ) : (
                      <GiMonsteraLeaf className="icon" />
                    )}
                  </span>
                  <div className="poruka-sadrzaj">
                    <div className="username">{user.username}</div>
                    <div className="text">{text}</div>
                  </div>
                </li>
              );
            })
          : null}
        <li>
          <span ref={scroll}></span>
        </li>
      </ul>

      <div className="input">
        <form onSubmit={handleMessageSubmit} className="texting-forma">
          <input
            type="text"
            placeholder="Unesi poruku..."
            autoFocus={true}
            value={text}
            onChange={handleMessageChange}
            required
          />
          <button type="submit" className="enter">
            Pošalji
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
