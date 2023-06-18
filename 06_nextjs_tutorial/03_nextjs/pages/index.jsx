import { useState } from 'react';

function Header({title}) {
  return (<h1>{title ? title : "Default tilte"}</h1>);
}

export default function HomePage() {
  const [likes, setLikes] = useState(0);
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  function handleClick() {
    console.log("increment like count");
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="React 💙"/>
      <Header title="A new title"/>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like({likes})</button>
    </div>
  );
}
