import React, { useState } from "react";
import { axiosWithAuth } from './../utils/axiosWithAuth';

import EditColorForm from './../forms/EditColorForm';
import AddColorForm from './../forms/AddColorForm';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = props => {

  const { colors, rerender, setRerender } = props;

  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

 
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = () => {
    setAdding(true);
    setColorToEdit(initialColor);
  }

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`,colorToEdit)
    .then(res => {
      setEditing(false);
      setRerender(!rerender);
    })
    .catch(err => {
      console.log(err)
    })
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res => {
      setRerender(!rerender);
    })
    .catch(err => {
      console.log(err)
    })
  };

  const saveAdd = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/colors`,newColor)
    .then(res => {
      setAdding(false);
      setRerender(!rerender);
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)} data-testid="color" >
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => addColor()}>+</button>
      {editing && (
        <EditColorForm saveEdit={saveEdit} setColorToEdit={setColorToEdit} colorToEdit={colorToEdit} setEditing={setEditing}/>
      )}
      {adding && (
        <AddColorForm setAdding={setAdding} newColor={newColor} setNewColor={setNewColor} saveAdd={saveAdd}/>
      )}
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
