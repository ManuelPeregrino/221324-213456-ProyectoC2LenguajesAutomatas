import React, { useEffect, useState } from "react";
import '../assets/css/dataview.css';

function DataView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [emailProvider, setEmailProvider] = useState('hotmail'); // Default to 'hotmail'

  const fetchLinks = {
    msn: "http://127.0.0.1:5000/get-matching-emails-msn",
    gmail: "http://127.0.0.1:5000/get-matching-emails-gmail",
    hotmail: "http://127.0.0.1:5000/get-matching-emails-hotmail",
    yahoo: "http://127.0.0.1:5000/get-matching-emails-yahoo"
  };

  useEffect(() => {
    setLoading(true);
    fetch(fetchLinks[emailProvider]) // Use selected email provider's URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
      });
  }, [emailProvider]); // Rerun effect when emailProvider changes

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProviderChange = (e) => {
    setEmailProvider(e.target.value);
  };

  const filteredData = data.filter(row => 
    row[2].toLowerCase().includes(searchTerm.toLowerCase()) // Assuming row[2] is the email
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="search-input">
      <select onChange={handleProviderChange} value={emailProvider}>
        <option value="msn">MSN</option>
        <option value="gmail">Gmail</option>
        <option value="hotmail">Hotmail</option>
        <option value="yahoo">Yahoo</option>
      </select>
      <input
        type="text"
        placeholder="Search by email..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div>
  <table className="DataTable">
    <thead>
        <tr className="DataView">
            <th>ID
                <tbody>
                    {filteredData.map((row, index) => (
                    <div key={index}>
                    {/* Assuming you want to display the email, which is in the third column */}
                    {row[0]}
                    </div>))}
                </tbody>
            </th>
            <th>Nombre
                <tbody>
                    {filteredData.map((row, index) => (
                    <div key={index}>
                    {/* Assuming you want to display the email, which is in the third column */}
                    {row[1]}
                    </div>))}
                </tbody>
            </th>
            <th>Email
                <tbody>
                    {filteredData.map((row, index) => (
                    <div key={index}>
                    {/* Assuming you want to display the email, which is in the third column */}
                    {row[2]}
                    </div>))}
                </tbody>
            </th>
            <th>Contacto
                <tbody>
                    {filteredData.map((row, index) => (
                    <div key={index}>
                    {/* Assuming you want to display the email, which is in the third column */}
                    {row[3]}
                    </div>))}
                </tbody>
            </th>
        </tr>
    </thead>

  </table>
    </div>
  );
}

export default DataView;
