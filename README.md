Frontend developer challenge

For this code challenge, you will be building a “Voyage progress” React component, which
simply put shows roughly how far the ferry is along its’ path. Here is an example of how the
component should look:

Karlshamn Klaipeda

Props

portOfLoading - string - e.g. Karlshamn
portOfDischarge - string - e.g. Klaipeda
departureTime - string | Date
arrivalTime - string | Date

Description
The challenge should be completed using React, Typescript and styled in emotion.sh.

The position of the “pin” along the voyage axis should be based on the difference between
the departure time, current time and arrival time, for example, if the ferry departs at 8:00 and
arrives at 13:00, and it is 10:00 right now, the pin should be placed 40%.

The pin should appear at the port of loading if it is not departure time yet, or at the port of
discharge, if it is already past arrival time. Dots should only appear in dark blue, if the pin has
moved past the center of that dot in the axis to the right.
