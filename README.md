# SensHealth   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="30" />
**SensHealth** is a solution that allows the headquarter to stay up-to-date on the vital condition of a patient who has required the assistance of a 118 team via our sensors.
## React Client Application Routes

- Route `/`: Users see the list of calls
- Route `/sensors`: Users see the list of sensors available and their actual status
- Route `/call/:callId`: Users open the call's page #callId
- Route `/alert/:callId`: Users can send an Alert to a department for the call #callId

## API Server
### Calls
  
- GET `/api/calls`
  - request parameters and request body content: `none`
  - response body content; `200 (success)` with below body structure:
####
  ```
  [
    {
        "id": 10,
        "status": "Active",
        "location": "45.09, 7.70",
        "time": "2022-28-11, 11:22",
        "name": "Laura",
        "surname": "Quaranta",
        "colorCode": "Yellow",
        "ambStatus": "Arriving",
        "img": path
    },
    {
        "id": 9,
        "status": "Active",
        "location": "45.04, 7.58",
        "time": "2022-28-11, 11:10",
        "name": "Adam",
        "surname": "Smith",
        "colorCode": "Green",
        "ambStatus": "Arrived",
        "img": path
    }
  ]
  ```

- GET `/api/calls/order/id`
  - request parameters and request body content: `none`
  - response body content; `200 (success)` with below body structure:
 ####
  ```
  [
    {
        "id": 1,
        "status": "Closed",
        "location": "45.19, 8.03",
        "time": "2022-28-11, 07:58",
        "name": "Mark",
        "surname": "Paper",
        "colorCode": "Yellow",
        "ambStatus": "Arrived",
        "img": path
    },
    {
        "id": 2,
        "status": "Closed",
        "location": "44.00, 7.50",
        "time": "2022-28-11, 08:13",
        "name": "Tiziano",
        "surname": "Steel",
        "colorCode": "Green",
        "ambStatus": "Arrived",
        "img": path
    }
  ]
  ```
  
- GET `/api/calls/order/active`
  - request parameters and request body content: `none`
  - response body content; `200 (success)` with below body structure:
####
  ```
  [
    {
        "id": 10,
        "status": "Active",
        "location": "45.09, 7.70",
        "time": "2022-28-11, 11:22",
        "name": "Laura",
        "surname": "Quaranta",
        "colorCode": "Yellow",
        "ambStatus": "Arriving",
        "img": path
    },
    {
        "id": 9,
        "status": "Active",
        "location": "45.04, 7.58",
        "time": "2022-28-11, 11:10",
        "name": "Adam",
        "surname": "Smith",
        "colorCode": "Green",
        "ambStatus": "Arrived",
        "img": path
    }
  ]
  ```

- GET `/api/calls/order/closed`
  - request parameters and request body content: `none`
  - response body content; `200 (success)` with below body structure:
 ####
  ```
  [
    {
        "id": 1,
        "status": "Closed",
        "location": "45.19, 8.03",
        "time": "2022-28-11, 07:58",
        "name": "Mark",
        "surname": "Paper",
        "colorCode": "Yellow",
        "ambStatus": "Arrived",
        "img": path
    },
    {
        "id": 2,
        "status": "Closed",
        "location": "44.00, 7.50",
        "time": "2022-28-11, 08:13",
        "name": "Tiziano",
        "surname": "Steel",
        "colorCode": "Green",
        "ambStatus": "Arrived",
        "img": path
    }
  ]
  ```
- GET `/api/call/:callId`
  - request parameters and request body content: `none`. Variable `callId` is needed in query parameters.
  - response body content; `200 (success)` with below body structure:
 ####
  ```
    {
        "id": 1,
        "status": "Closed",
        "location": "45.19, 8.03",
        "time": "2022-28-11, 07:58",
        "name": "Mark",
        "surname": "Paper",
        "colorCode": "Yellow",
        "ambStatus": "Arrived",
        "img": path
    }
  ```
- PUT `/api/call/:callId`
  - request parameters and request body content: `none`. Variable `callId` is needed in query parameters.
  - response body content: `200 (success)`.

### Departments

- GET `/api/departments`
  - request parameters and request body content: `none`.
  - response body content: `200 (success)` with list of departments:
 ####
  ```
  [
    {
        "id": 7,
        "name": "Day hospital"
    },
    {
        "id": 6,
        "name": "Radiology"
    },
    {
        "id": 5,
        "name": "Cardiology"
    },
    {
        "id": 4,
        "name": "Neurosurgery"
    },
    {
        "id": 3,
        "name": "Neonatology"
    },
    {
        "id": 2,
        "name": "Infectious diseases"
    },
    {
        "id": 1,
        "name": "Anesthesiology and intensive care"
    }
  ]
  ```
  
### Alerts

- POST `/api/sendAlert/`
  - request parameters and request body content: `description, callId & departmentId`:
  ####
  ```
    {
        "description": "Description",
        "callId": 9,
        "departmentId": 1,
    }
  ```
  - response body content: `200 (success)`.

- GET `/api/alerts/:callId`
  - request parameters and request body content: `none`. Variable `callId` is needed in query parameters.
  - response body content; `200 (success)` with below body structure:
 ####
  ```
    [
      {
          "id": 10,
          "description": "First try",
          "callId": 9,
          "department": "Anesthesiology and intensive care"
      }
    ]
  ```
  
## Database Tables

- Table `Call` - contains:
  - id
  - status
  - location
  - time
  - name
  - surname
  - colorCode
  - ambStatus
  -img

- Table `Department` - contains:
  - id
  - name

- Table `Alert` - contains:
  - id
  - description
  - callId
  - depId
