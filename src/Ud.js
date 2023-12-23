import React, { useEffect, useState } from 'react';
import './Ud.css'; 
import './App.css'; 

const Ud = () => {
  const API = "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers";
  const [data, setData] = useState(null);

  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const fetchedData = await res.json();
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchApiData(API);
  }, [API]);

  
  const ticketsByStatus = data?.tickets.reduce((acc, ticket) => {
    acc[ticket.status] = acc[ticket.status] || [];
    acc[ticket.status].push(ticket);
    return acc;
  }, {});

  return (
    
      <div className="status-grid-container">
        {Object.entries(ticketsByStatus || {}).map(([status, tickets]) => (
          <div key={status} className={`status-column ${status.toLowerCase().replace(/\s+/g, '-')}`}>
            <h2>{status}</h2>
            {tickets.map((ticket) => (
              <div key={ticket.id} className="grid-item card">
                <h3>{ticket.title}</h3>
                <p>ID: {ticket.id}</p>
                <p>User: {data.users.find((user) => user.id === ticket.userId)?.name}</p>
                <p>Tag: {ticket.tag}</p>
                
              </div>
            ))}
          </div>
          
        
        ))}
      </div>
    
  );
};

export default Ud;
