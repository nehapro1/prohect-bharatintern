document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
// ha
        var statusColor = status === 'Task Completed' ? 'green' : 'blue'; // Change color based on status

        issuesList.innerHTML += '<div class="well">' +
            '<div class="labid"> <p><span id="status_' + id + '" class="label label-info" style="background-color:' + statusColor + '">' + status + '</span></p>' +
            '<h6>Task ID: ' + id + '</h6> </div>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-folder-open"></span> ' + severity + ' ' +
            '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" id="closebtn" class="btn btn-success" onclick="setStatusClosed(\'' + id + '\')"><i class="far fa-check-circle"></i>&nbsp;Mark as Completed</a> ' +
            '<a href="#" id="delbtn" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')"><i class="glyphicon glyphicon-trash"></i> Delete</a>' +
            '</div>';
    }
}

function saveIssue(e) {
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Pending';
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Task Completed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function saveIssue() {
    const projectName = document.getElementById("issueSeverityInput").value;
    const taskDetails = document.getElementById("issueDescInput").value;
    const assignedTo = document.getElementById("issueAssignedToInput").value;

    $.post("back.php", { projectName, taskDetails, assignedTo }, function (data) {
        fetchIssues(); // Reload the task list after assigning a new task
        // You can add additional handling based on the response from the server
    });
}
