import { useMemo, useState } from "react";
import MasterPageShell from "./MasterPageShell";

function HobbiesMaster() {
  const columns = useMemo(() => [
    { field: "HobbyId", header: "ID" },
    { field: "HobbyName", header: "Hobby Name" },
    { field: "Status", header: "Status" },
  ], []);

  const initialRows = useMemo(() => [
    { HobbyId: 1, HobbyName: "Drawing", Status: "Active" },
    { HobbyId: 2, HobbyName: "Music", Status: "Active" },
    { HobbyId: 3, HobbyName: "Sports", Status: "Active" },
  ], []);

  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {})
  );
  const [hobbies, setHobbies] = useState(initialRows);
  const [showForm, setShowForm] = useState(false);
  const initialForm = useMemo(() => ({ HobbyName: "", Status: "Active" }), []);
  const [formData, setFormData] = useState(initialForm);

  const handleSave = () => {
    setHobbies((current) => [
      ...current,
      {
        HobbyId: current.length + 1,
        HobbyName: formData.HobbyName,
        Status: formData.Status,
      },
    ]);
    setShowForm(false);
    setFormData(initialForm);
  };

  return (
    <MasterPageShell
      title="Hobbies Master"
      entityName="Hobby"
      columns={columns}
      rows={hobbies}
      filters={filters}
      setFilters={setFilters}
      showForm={showForm}
      setShowForm={setShowForm}
      formData={formData}
      setFormData={setFormData}
      initialForm={initialForm}
      nameField="HobbyName"
      nameLabel="Hobby Name"
      onSave={handleSave}
    />
  );
}

export default HobbiesMaster;
