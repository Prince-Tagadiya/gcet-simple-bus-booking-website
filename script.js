  // Generate a unique booking ID based on branch, route, and last 4 digits of student ID.
  function generateBookingId(branch, route, studentId) {
    const formattedBranch = branch.trim().toUpperCase().replace(/\s+/g, "");
    let formattedRoute = "";
    const routeParts = route.split("to");
    if (routeParts.length > 1) {
      formattedRoute = routeParts[1].trim().toUpperCase().replace(/\s+/g, "");
    } else {
      formattedRoute = route.trim().toUpperCase().replace(/\s+/g, "");
    }
    const studentPart = studentId.slice(-4);
    return `GCET-${formattedBranch}${formattedRoute}${studentPart}`;
  }

  document.getElementById("generateTicketBtn").addEventListener("click", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const studentId = document.getElementById("studentId").value;
    const branch = document.getElementById("branch").value;
    const route = document.querySelector('input[name="route"]:checked').value;
    const date = new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    
    const bookingId = generateBookingId(branch, route, studentId);
    
    document.getElementById("ticket-name").textContent = name;
    document.getElementById("ticket-studentId").textContent = studentId;
    document.getElementById("ticket-branch").textContent = branch;
    document.getElementById("ticket-route").textContent = route;
    document.getElementById("ticket-date").textContent = date;
    document.getElementById("ticket-bookingId").textContent = "Booking ID: " + bookingId;
    
    const qrContent = encodeURIComponent(
      `GCET Bus Ticket\nName: ${name}\nID: ${studentId}\nBranch: ${branch}\nRoute: ${route}\nDate: ${date}\nBooking ID: ${bookingId}`
    );
    document.getElementById("qr-code").src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrContent}`;
    
    gsap.to("#bookingFormSection", { duration: 0.5, opacity: 0, y: -50, onComplete: function(){
        document.getElementById("bookingFormSection").style.display = "none";
        document.getElementById("ticketSection").style.display = "block";
        gsap.fromTo("#ticketSection", { opacity: 0, y: 50 }, { duration: 0.6, opacity: 1, y: 0 });
    }});
  });

  document.getElementById("downloadBtn").addEventListener("click", function() {
    html2canvas(document.getElementById("ticketContainer"), { 
        useCORS: true, 
        scale: window.devicePixelRatio || 2, 
        scrollX: 0,
        scrollY: 0,
        backgroundColor: null 
    }).then(function(canvas) {
        const link = document.createElement("a");
        link.download = "GCET_Ticket.jpg";
        link.href = canvas.toDataURL("image/jpeg", 0.9);
        link.click();
    });
  });

  document.getElementById("backBtn").addEventListener("click", function() {
    window.location.reload();
  });