const ReportCard = ({ title, icon, color, loading, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 ${color} text-white p-4 rounded-lg shadow-md transition w-full`}
            disabled={loading}
        >
            {icon} {loading ? "Generating..." : title}
        </button>
    );
};

export default ReportCard;