import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
// styles
import "./Create.css";
const categories = [
  { value: "indie rock", label: "Indie Rock" },
  { value: "pop", label: "Pop" },
  { value: "hip-hop", label: "Hip-Hop" },
  { value: "oldies", label: "Oldies" },
];
export default function Create() {
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [upNext, setUpNext] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);
  // console.log(users)
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name, details, upNext, category.value, assignedUsers);
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create Song</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Song name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Song Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Song On Deck Due:</span>
          <input
            required
            type="number"
            onChange={(e) => setUpNext(e.target.value)}
            value={upNext}
          />
        </label>
        <label>
          <span>Song Genre:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Add Song</button>
      </form>
    </div>
  );
}
