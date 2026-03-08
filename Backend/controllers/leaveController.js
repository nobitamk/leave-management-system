const Leave = require("../models/Leave");

// Apply Leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const leave = new Leave({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await leave.save();

    res.status(201).json({ message: "Leave request submitted", leave });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get My Leaves (Employee)
exports.getMyLeaves = async (req, res) => {
  try {

    const leaves = await Leave.find({ employeeId: req.user.id });

    res.json(leaves);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Employer: View All Leave Requests
exports.getAllLeaves = async (req, res) => {
  try {

    const leaves = await Leave.find().populate("employeeId", "name email");

    res.json(leaves);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Approve Leave
exports.approveLeave = async (req, res) => {
  try {

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json(leave);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Reject Leave
exports.rejectLeave = async (req, res) => {
  try {

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json(leave);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};