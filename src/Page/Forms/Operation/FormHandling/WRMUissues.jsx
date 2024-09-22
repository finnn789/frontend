import React, { useState, useEffect } from "react";
import CardFormK3 from "../../Components/CardFormK3";
import GridLayout from "../../Layout/GridLayout";
import FormControlCard from "../../Components/FormControl";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
import TableComponent from "../../Components/TableComponent";
import { Button } from "@chakra-ui/react";
import { createJobIssue, updateJobIssue } from "../../../../Page/API/PostKkks";
import { getWRMIssues } from "../../../../Page/API/APIKKKS";
import { useToast } from '@chakra-ui/react';

const WRMUissues = ({ job_id }) => {
  const toast = useToast(); // Inisialisasi toast Chakra UI

  // Ambil job_id dari objek parameter
  const jobIdValue = job_id?.job_id || ""; // Ambil nilai job_id dari objek

  const [issues, setIssues] = useState([]); // Menyimpan data issues yang diambil dari API
  const [loading, setLoading] = useState(false); // Menyimpan status loading
  const [formValues, setFormValues] = useState({
    date_time: new Date().toISOString(), // Tanggal dan waktu saat ini
    severity: "",
    description: "",
    resolved: false, // Default: belum diselesaikan
    resolved_date_time: null, // Default: kosong/null
  });

  const LOW_SEVERITY = "LOW";
  const MEDIUM_SEVERITY = "MEDIUM";
  const HIGH_SEVERITY = "HIGH";
  const CRITICAL_SEVERITY = "CRITICAL";

  // Kolom tabel
  const columns = [
    { Head: "No", accessor: "no" }, // Menambahkan nomor urut
    { Head: "Date", accessor: "date_time" },
    { Head: "Severity", accessor: "severity" },
    { Head: "Description", accessor: "description" },
    { Head: "Status", accessor: "resolved", render: (row) => (row.resolved ? "Resolved" : "Unresolved") },
    {
      Head: "Aksi",
      render: (row, index) => (
        !row.resolved && ( // Jika status "resolved" adalah false, maka tampilkan tombol "Resolve"
          <Button colorScheme="blue" onClick={() => handleResolveIssue(row)}>
            Resolve
          </Button>
        )
      ),
    },
  ];

  // Fungsi untuk mengambil data issues dari API
  const fetchIssues = async () => {
    setLoading(true);
    try {
      if (!jobIdValue) {
        console.error("Job ID is missing.");
        return;
      }

      const response = await getWRMIssues(jobIdValue); // Memanggil endpoint GET dengan jobIdValue
      setIssues(Array.isArray(response.data) ? response.data : []); // Mengisi state issues dengan data dari API
    } catch (error) {
      console.error("Error fetching WRM Issues", error);
      setIssues([]); // Set data ke array kosong jika ada error
    } finally {
      setLoading(false);
    }
  };

  // Jalankan fetchIssues saat komponen pertama kali dimuat atau jika job_id berubah
  useEffect(() => {
    if (jobIdValue) {
      fetchIssues();
    }
  }, [jobIdValue]);

  // Fungsi untuk menangani perubahan pada input form
  const handleInputChange = (name) => (e) => {
    const newValue = e.target.value;
    setFormValues({
      ...formValues,
      [name]: newValue,
    });
    console.log(`${name} changed to:`, newValue); // Tampilkan perubahan input ke console
  };

  // Fungsi untuk mengirim data baru (POST)
  const handleCreateIssue = async () => {
    try {
      if (!jobIdValue) {
        console.error("Job ID is missing.");
        return;
      }

      const newIssue = {
        ...formValues,
        job_id: jobIdValue, 
        date_time: new Date().toISOString(),
        resolved: false, 
        resolved_date_time: null,
      };

      console.log("New issue to be created:", newIssue); // Log issue baru sebelum POST

      const response = await createJobIssue(newIssue, toast); // Memanggil fungsi createJobIssue dengan data baru dan toast
      console.log("Job issue created:", response); // Log hasil respons dari createJobIssue
      fetchIssues(); // Ambil ulang data setelah issue dibuat
    } catch (error) {
      console.error("Error creating job issue", error);
    }
  };

  // Fungsi untuk menangani aksi resolve (PATCH)
  const handleResolveIssue = async (issue) => {
    try {
      const updatedIssue = {
        resolved: true, // Set resolved menjadi true
        resolved_date_time: new Date().toISOString(), // Set waktu resolved ke waktu saat ini
      };
      await updateJobIssue(issue.id, updatedIssue); // Memanggil endpoint PATCH dengan id issue
      toast({
        title: "Issue Resolved",
        description: `Issue with ID ${issue.id} has been resolved.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchIssues(); // Ambil ulang data setelah issue diupdate
    } catch (error) {
      console.error("Error resolving issue", error);
      toast({
        title: "Error",
        description: "Failed to resolve issue.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Menambahkan nomor pada kolom "No"
  const issuesWithNumbers = issues.map((issue, index) => ({
    ...issue,
    no: index + 1, // Menambahkan nomor urut pada setiap issue
  }));

  // Render form dan tabel
  return (
    <CardFormK3 title="WRM Issues" subtitle="" overflowY="auto">
      <GridLayout Columns={1} Gap={2}>
        <GridLayout.Item>
          <SelectComponent
            label="Severity"
            name="severity"
            value={formValues.severity}
            onChange={handleInputChange("severity")}
            placeholder="Select Severity"
          >
            <SelectOption value={LOW_SEVERITY} label={LOW_SEVERITY} />
            <SelectOption value={MEDIUM_SEVERITY} label={MEDIUM_SEVERITY} />
            <SelectOption value={HIGH_SEVERITY} label={HIGH_SEVERITY} />
            <SelectOption value={CRITICAL_SEVERITY} label={CRITICAL_SEVERITY} />
          </SelectComponent>
          <FormControlCard
            labelForm="Issue Description"
            isTextArea
            value={formValues.description}
            onChange={handleInputChange("description")}
          />
          <Button colorScheme="green" onClick={handleCreateIssue}>
            Create Issue
          </Button>
        </GridLayout.Item>
      </GridLayout>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <TableComponent headers={columns} data={issuesWithNumbers} headerKey="Head" />
      )}
    </CardFormK3>
  );
};

export default WRMUissues;
