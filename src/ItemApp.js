import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import colData, { ALL_COLUMNS } from "./components/colData";
import Toast from "./components/Toast";

const ItemApp = () => {
  const [columnData, setColumnData] = useState(ALL_COLUMNS);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarValue, setSnackbarValue] = useState({ open: false });
  const [selectedColumnValue, setSelectedColumnValue] = useState();

  // maintain localStorage
  useEffect(() => {
    localStorage.setItem("columnData", JSON.stringify(columnData));
  }, [columnData]);

  const handleItemDelete = (e) => {
    setColumnData(
      columnData.map((column) => ({
        ...column,
        items: column.items.filter((item) => item.id !== e.currentTarget.name),
      }))
    );
    setSnackbarValue({
      open: true,
      severity: "success",
      message: "item deleted",
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResetColumns = () => {
    return (
      setColumnData(colData),
      setSnackbarValue({
        open: true,
        severity: "success",
        message: `Columns reset to initial state.`,
      })
    );
  };

  const addItem = (e) => {
    e.preventDefault();
    const itemName = e.target[0].value;
    const bothInvalid = !itemName && !selectedColumnValue ? true : false;
    // if itemName or selectedColumn is blank
    return !selectedColumnValue || !itemName
      ? setSnackbarValue({
          open: true,
          severity: "error",
          message: `Please provide a valid ${
            !selectedColumnValue ? "column" : ""
          }${bothInvalid ? " and " : ""}${
            !itemName ? "item" : ""
          } and submit again.`,
        })
      : (setColumnData((prevState) => [
          ...prevState.map((el) =>
            el.id === selectedColumnValue
              ? {
                  ...el,
                  items: [...el.items, { name: itemName, id: nanoid() }],
                }
              : el
          ),
        ]),
        setSnackbarValue({
          open: true,
          severity: "success",
          message: "item added",
        }),
        //RESET SELECTION AND INPUT VALUES (DISABLED COLUMN RESET FOR UX REASONS)
        // setSelectedColumnValue("0"),
        (e.target[0].value = ""));
  };

  const ColumnGrid = () => {
    const Columns = () =>
      columnData.map((column) => {
        const Items = () =>
          column.items.map(({ ...item }) => {
            return (
              item.name.includes(searchTerm) && (
                <div key={item.id} className="item-app-column-item">
                  <span>{item.name}</span>
                  <IconButton
                    aria-label="delete"
                    onClick={handleItemDelete}
                    name={item.id}
                  >
                    <CancelIcon />
                  </IconButton>
                </div>
              )
            );
          });
        return (
          <div className="item-app-column-container" key={column.name}>
            <h3 className="item-app-gradient-dark" key={column.name}>
              {column.name}
            </h3>
            <Items />
          </div>
        );
      });

    return (
      <div className="item-app-columns">
        <Columns />
      </div>
    );
  };

  return (
    <>
      <div className="item-app">
        <h2 className="item-app-gradient">Add an item</h2>
        <div
          className="item-app-grid"
          style={{ gridTemplateColumns: `1fr ${columnData.length}fr` }}
        >
          <div className="item-app-column-forms">
            <form aria-label="addItemForm" onSubmit={addItem}>
              <div className="item-app-form-entry">
                <TextField
                  variant="outlined"
                  id="new-entry-input"
                  label="Enter Item"
                />
                <NativeSelect
                  variant="outlined"
                  value={selectedColumnValue}
                  onChange={(e) => setSelectedColumnValue(e.target.value)}
                  inputProps={{
                    name: "column",
                    id: "column-native-select-helper",
                  }}
                >
                  <option value="">Choose Column</option>
                  {columnData.map((column) => {
                    return (
                      <option value={column.id} key={column.id}>
                        {column.name}
                      </option>
                    );
                  })}
                </NativeSelect>
              </div>
              <Button type="submit" variant="outlined">
                Add Item
              </Button>
            </form>
            <TextField
              id="standard-search"
              label="Search an Item"
              type="search"
              placeholder="search..."
              onChange={handleSearchChange}
              variant="outlined"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </div>
          <ColumnGrid />
        </div>
        <Button
          aria-label="resetItemsToOriginalValues"
          variant="outlined"
          onClick={handleResetColumns}
          style={{ marginTop: 10, width: "100%" }}
        >
          Reset Items
        </Button>
      </div>
      <Toast data={{ snackbarValue, setSnackbarValue }} />
    </>
  );
};

export default ItemApp;
