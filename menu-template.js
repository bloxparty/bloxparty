module.exports = [
  {
    "label": "Blox Party",
    "submenu": [
      {
        "label": "About Blox Party",
        "selector": "orderFrontStandardAboutPanel:"
      },
      {
        "type": "separator"
      },
      {
        "label": "Hide Blox Party",
        "accelerator": "CmdOrCtrl+H",
        "selector": "hide:"
      },
      {
        "label": "Hide Others",
        "accelerator": "CmdOrCtrl+Shift+H",
        "selector": "hideOtherApplications:"
      },
      {
        "label": "Show All",
        "selector": "unhideAllApplications:"
      },
      {
        "type": "separator"
      },
      {
        "label": "Quit",
        "accelerator": "CmdOrCtrl+Q",
        "selector": "terminate:"
      }
    ]
  }
]