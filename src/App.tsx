import { useReducer } from "react";
import "./App.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  salary: "",
  image: null,
  pdf: null,
};
type State = {
  name: string;
  email: string;
  password: string;
  salary: string;
  image: File | null;
  pdf: File | null;
};
type Action =
  | {
      type: "INPUT";
      field: keyof State;
      value: string;
    }
  | {
      type: "FILE";
      field: "image" | "pdf";
      file: File | null;
    }
  | {
      type: "RESET";
    };
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "FILE":
      return {
        ...state,
        [action.field]: action.file,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      dispatch({
        type: "FILE",
        field: name as "image" | "pdf",
        file: files[0],
      });
    } else {
      dispatch({
        type: "INPUT",
        field: name as keyof State,
        value: value,
      });
    }
  };

  const imagePreview = state.image ? URL.createObjectURL(state.image) : null;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(state, "stateValuess");
  };
  return (
    <>
      <div className="container">
        <div className="form-box">
          <h2 className="title">Employee Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                className="input-field"
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                className="input-field"
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Enter Email"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                className="input-field"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>

            <div className="input-group">
              <label>Salary</label>
              <input
                className="input-field"
                type="number"
                name="salary"
                value={state.salary}
                onChange={handleChange}
                placeholder="Enter Salary"
              />
            </div>

            <div className="input-group">
              <label>Upload Image</label>
              <input
                className="file-input"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              {imagePreview && (
                <img
                  className="preview-img"
                  src={imagePreview}
                  alt="Selected"
                />
              )}
            </div>

            <div className="input-group">
              <label>Upload PDF</label>
              <input
                className="file-input"
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={handleChange}
              />
            </div>

            <button className="save-btn" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
