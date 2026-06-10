import { useEffect, useMemo, useState } from "react";
import MasterPageShell from "./MasterPageShell";

function StandardMaster() {
  const columns = useMemo(() => [
    { field: "StandardID", header: "ID" },
    { field: "StandardName", header: "Standard Name" },
    { field: "Status", header: "Status" },
  ], []);

  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {})
  );
  const [standards, setStandards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const initialForm = useMemo(() => ({ StandardName: "", Status: "Active" }), []);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetch("https://localhost:44377/api/master/getStandards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => setStandards(data))
      .catch((err) => console.error(err));
  }, [filters]);

  const handleSave = () => {
    fetch("https://localhost:44377/api/master/saveStandards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        setShowForm(false);
        setFormData(initialForm);
        setFilters({ ...filters });
      });
  };

  return (
    <MasterPageShell
      title="Standard Master"
      entityName="Standard"
      columns={columns}
      rows={standards}
      filters={filters}
      setFilters={setFilters}
      showForm={showForm}
      setShowForm={setShowForm}
      formData={formData}
      setFormData={setFormData}
      initialForm={initialForm}
      nameField="StandardName"
      nameLabel="Standard Name"
      onSave={handleSave}
    />
  );
}

export default StandardMaster;
