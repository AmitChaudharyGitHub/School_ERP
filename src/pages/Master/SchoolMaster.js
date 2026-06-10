import { useEffect, useMemo, useState } from "react";
import MasterPageShell from "./MasterPageShell";

function SchoolMaster() {
  const columns = useMemo(() => [
    { field: "SchoolId", header: "ID" },
    { field: "SchoolName", header: "School Name" },
    { field: "Status", header: "Status" },
  ], []);

  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {})
  );
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const initialForm = useMemo(() => ({ SchoolName: "", Status: "Active" }), []);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetch("https://localhost:44377/api/master/getSchools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => setSchools(data))
      .catch((err) => console.error(err));
  }, [filters]);

  const handleSave = () => {
    fetch("https://localhost:44377/api/master/saveSchools", {
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
      title="School Master"
      entityName="School"
      columns={columns}
      rows={schools}
      filters={filters}
      setFilters={setFilters}
      showForm={showForm}
      setShowForm={setShowForm}
      formData={formData}
      setFormData={setFormData}
      initialForm={initialForm}
      nameField="SchoolName"
      nameLabel="School Name"
      onSave={handleSave}
    />
  );
}

export default SchoolMaster;
