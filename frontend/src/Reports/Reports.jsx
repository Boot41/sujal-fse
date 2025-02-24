import { useState } from "react";
import axios from "axios";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import ReportCard from "../Reports/ReportCard";

const Reports = () => {
    const [loading, setLoading] = useState({ pdf: false, excel: false });

    const generateReport = async (type) => {
        setLoading((prev) => ({ ...prev, [type]: true }));
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/report/${type}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                responseType: "blob",
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `business-report.${type === "pdf" ? "pdf" : "xlsx"}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Automatically trigger download to default folder
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(response.data, `business-report.${type === "pdf" ? "pdf" : "xlsx"}`);
            }
        } catch (error) {
            console.error(`Error generating ${type} report:`, error);
        }
        setLoading((prev) => ({ ...prev, [type]: false }));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-500">Reports & Analytics 📊</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReportCard
                    title="Download PDF Report"
                    icon={<FaFilePdf size={24} />}
                    color="bg-red-500 hover:bg-red-600"
                    loading={loading.pdf}
                    onClick={() => generateReport("pdf")}
                />
                <ReportCard
                    title="Download Excel Report"
                    icon={<FaFileExcel size={24} />}
                    color="bg-green-500 hover:bg-green-600"
                    loading={loading.excel}
                    onClick={() => generateReport("excel")}
                />
            </div>
        </div>
    );
};

export default Reports;