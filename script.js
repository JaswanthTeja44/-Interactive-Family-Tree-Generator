        const treeData = {};
        const memberRelations = [];

        function updateSubRelation() {
            const subTypeSelect = document.getElementById("relationSubType");
            const mainType = document.getElementById("relationType").value;
            subTypeSelect.innerHTML = "";

            let options = [];
            if (mainType === "parent") {
                options = ["Father", "Mother"];
            } else if (mainType === "child") {
                options = ["Son", "Daughter"];
            }

            options.forEach(opt => {
                const option = document.createElement("option");
                option.value = opt.toLowerCase();
                option.text = opt;
                subTypeSelect.appendChild(option);
            });
        }

        function addMember() {
            const name = document.getElementById("name").value.trim();
            const relationType = document.getElementById("relationType").value;
            const relationSubType = document.getElementById("relationSubType").value;
            const relatedTo = document.getElementById("relatedTo").value.trim();

            if (!name || !relationType || !relationSubType || !relatedTo) {
                alert("Please fill out all fields.");
                return;
            }

            if (!treeData[name]) {
                treeData[name] = { name, children: [] };
            }

            if (!treeData[relatedTo]) {
                treeData[relatedTo] = { name: relatedTo, children: [] };
            }

            if (relationType === "parent") {
                treeData[name].children.push(treeData[relatedTo]);
            } else if (relationType === "child") {
                treeData[relatedTo].children.push(treeData[name]);
            }

            memberRelations.push(`${name} is the ${relationSubType} of ${relatedTo}`);

            renderTree();
            renderDisplay();

            document.getElementById("name").value = "";
            document.getElementById("relatedTo").value = "";
            document.getElementById("relationType").value = "";
            document.getElementById("relationSubType").innerHTML = '<option value="">-- Select Specific Relation --</option>';
        }

        function createNode(member) {
            const node = document.createElement("div");
            node.className = "node";
            node.innerText = member.name;

            if (member.children.length > 0) {
                const connector = document.createElement("div");
                connector.className = "connector";
                node.appendChild(connector);

                const childrenContainer = document.createElement("div");
                childrenContainer.className = "children";
                member.children.forEach(child => {
                    childrenContainer.appendChild(createNode(child));
                });
                node.appendChild(childrenContainer);
            }

            return node;
        }

        function renderTree() {
            const root = document.getElementById("familyTree");
            root.innerHTML = "";

            const roots = Object.values(treeData).filter(member => {
                return !Object.values(treeData).some(other => other.children.includes(member));
            });

            roots.forEach(rootMember => {
                root.appendChild(createNode(rootMember));
            });
        }

        function renderDisplay() {
            const list = document.getElementById("membersDisplay");
            list.innerHTML = "";

            memberRelations.forEach(rel => {
                const li = document.createElement("li");
                li.innerText = rel;
                list.appendChild(li);
            });
        }