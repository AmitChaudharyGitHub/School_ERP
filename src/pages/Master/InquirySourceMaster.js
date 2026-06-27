import { useEffect, useMemo, useState } from "react";
import MasterPageShell from "./MasterPageShell";

function InquirySourceMaster() {
  const columns = useMemo(() => [
    { field: "InquirySourceId", header: "ID" },
    { field: "InquirySourceName", header: "Inquiry Source Name" },
    { field: "Status", header: "Status" },
  ], []);

  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: "" }), {})
  );
  const [inquirySources, setInquirySources] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const initialForm = useMemo(() => ({ InquirySourceName: "", Status: "Active" }), []);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetch("https://localhost:44377/api/master/getInquirySources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((res) => res.json())
      .then((data) => setInquirySources(data))
      .catch((err) => console.error(err));
  }, [filters]);

  const handleSave = () => {
    fetch("https://localhost:44377/api/master/saveInquirySources", {
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
      title="Inquiry Source Master"
      entityName="Inquiry Source"
      columns={columns}
      rows={inquirySources}
      filters={filters}
      setFilters={setFilters}
      showForm={showForm}
      setShowForm={setShowForm}
      formData={formData}
      setFormData={setFormData}
      initialForm={initialForm}
      nameField="InquirySourceName"
      nameLabel="Inquiry Source Name"
      onSave={handleSave}
    />
  );
}

export default InquirySourceMaster;
