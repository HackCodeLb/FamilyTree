window.onload = function () {
  var familyData;
  var totalMembers;
  FamilyTree.templates.tommy_male.plus =
    '<circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>'
    + '<line x1="0" y1="-11" x2="0" y2="11" stroke-width="1" stroke="#aeaeae"></line>';
  FamilyTree.templates.tommy_male.minus =
    '<circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>';
  FamilyTree.templates.tommy_female.plus =
    '<circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>'
    + '<line x1="0" y1="-11" x2="0" y2="11" stroke-width="1" stroke="#aeaeae"></line>';
  FamilyTree.templates.tommy_female.minus =
    '<circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>';

  FamilyTree.templates.tommy_female.defs = '<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart"><path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/><g>';
  FamilyTree.templates.tommy_male.defs = '<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart"><path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/><g>';

  // this is for filtered items
  FamilyTree.templates.filtered = Object.assign({}, FamilyTree.templates.tommy);
  FamilyTree.templates.filtered.node = '<rect x="0" y="0" height="{h}" width="{w}"stroke-width="1" fill="#aeaeae" stroke="#aeaeae" rx="7" ry="7"></rect>';

  document.getElementById("loading-spinner").style.display = "block";
  function fetchFamilyDataAndInitialize() {
    return fetchFamilyData()
      .then(function (data) {
        familyData = data;
        totalMembers = familyData.length;
        // console.log("Fetched familyData:", familyData);
        // return { totalMembers, males, females };
        return { totalMembers };
      })
      .catch(function (error) {
        console.log('Error:', error);
        return null;
      });
  }

  function initializeFamilyData() {
    const storedData = {
      familyData: localStorage.getItem("familyData"),
      expiryTime: localStorage.getItem("familyDataExpiry")
    };

    if (storedData.familyData && storedData.expiryTime > Date.now()) {
      // Use familyData from local storage
      familyData = JSON.parse(storedData.familyData);
      totalMembers = familyData.length;
      // return Promise.resolve({ totalMembers, males, females });
      return Promise.resolve({ totalMembers });
    } else {
      // Fetch familyData and save it in local storage
      return fetchFamilyDataAndInitialize()
        .then(function (data) {
          if (data) {
            // Save familyData in local storage along with expiration time
            const expirationTime = Date.now() + (1 * 60 * 60 * 1000);
            localStorage.setItem("familyData", JSON.stringify(familyData));
            localStorage.setItem("familyDataExpiry", expirationTime);
          }
          return data;
        });
    }
  }

  initializeFamilyData()
    .then(function (data) {
      if (data) {
        // Update the family name and total count in the HTML
        document.getElementById("total-members").textContent = data.totalMembers;
        // Hide the loading spinner
        document.getElementById("loading-spinner").style.display = "none";
        initializeFamilyTree();
      }
    });

  // this is for future use, if we want count of defined segment 
  // countOccurrencesByProperty(familyData, "gender", "value")
  // function countOccurrencesByProperty(data, propertyName, propertyValue) {
  //   return data.filter(item => item[propertyName] === propertyValue).length;
  // }


  function initializeFamilyTree() {
    var createFamilyTree = function (orientation) {
      var family = new FamilyTree(document.getElementById("tree"), {
        mouseScrool: FamilyTree.action.scroll,
        showYScroll: FamilyTree.scroll.visible,
        showXScroll: FamilyTree.scroll.visible,
        // scaleInitial: FamilyTree.match.boundary,
        orientation: orientation,
        editForm: {
          buttons: {
            edit: null, // Set to null or remove the "edit" button
          }
        },
        template: "hugo",
        filterBy: {
          gender: {}
        },
        // uncomment this section if you want default dot look for filtered out ones
        // tags: {
        //   filter: {
        //     template: 'dot'
        //   }
        // },
        nodeBinding: {
          field_0: "name",
          // field_1: "name",
          img_0: 'img'
        },
        nodes: familyData
      });

      family.on('expcollclick', function (sender, isCollapsing, nodeId) {
        var node = family.getNode(nodeId);
        if (isCollapsing) {
          family.expandCollapse(nodeId, [], node.ftChildrenIds);
        } else {
          family.expandCollapse(nodeId, node.ftChildrenIds, []);
        }
        return false;
      });

      family.on('render-link', function (sender, args) {
        if (args.cnode.ppid != undefined)
          args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + (args.p.xa) + '" y="' + (args.p.ya) + '"/>';
        if (args.cnode.isPartner && args.node.partnerSeparation == 30)
          args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + (args.p.xb) + '" y="' + (args.p.yb) + '"/>';
      });

      return family;
    };

    var dropdown = document.getElementById("orientation-dropdown");
    var family = createFamilyTree(FamilyTree.orientation.bottom_left); // Initial tree creation

    dropdown.addEventListener("change", function () {
      var selectedValue = parseInt(dropdown.options[dropdown.selectedIndex].value);
      family.destroy(); // Destroy the existing family tree
      family = createFamilyTree(selectedValue); // Recreate the family tree with the updated orientation
      family.draw(); // Draw the family tree
    });

    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
  }
}