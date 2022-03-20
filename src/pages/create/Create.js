import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
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
  const { user } = useAuthContext();
  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [upNext, setUpNext] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

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
    setFormError(null);

    if (!category) {
      setFormError("Please select a genre");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assign the song to at least 1 user");
      return;
    }
    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const createdBy = {
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      id: user.id,
    };
    const song = {
      name,
      details,
      category: category.value,
      upNext: timestamp.fromDate(new Date(upNext)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    console.log(song);
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

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
