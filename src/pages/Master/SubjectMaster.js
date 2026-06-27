import { useEffect, useMemo, useState } from "react";
import MasterPageShell from "./MasterPageShell";

function SubjectsMaster() {
  const columns = useMemo(() => [
    { field: "SubjectId", header: "ID" },
    { field: "SubjectName", header: "Subject Name" },
    { field: "Status", header: "Status" },
  ], []);

  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {})
  );
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const initialForm = useMemo(() => ({ SubjectName: "", Status: "Active" }), []);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetch("https://localhost:44377/api/master/getSubjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error(err));
  }, [filters]);

  const handleSave = () => {
    fetch("https://localhost:44377/api/master/saveSubjects", {
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
      title="Subject Master"
      entityName="Subject"
      columns={columns}
      rows={subjects}
      filters={filters}
      setFilters={setFilters}
      showForm={showForm}
      setShowForm={setShowForm}
      formData={formData}
      setFormData={setFormData}
      initialForm={initialForm}
      nameField="SubjectName"
      nameLabel="Subject Name"
      onSave={handleSave}
    />
  );
}

export default SubjectsMaster;
