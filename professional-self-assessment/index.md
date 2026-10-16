# Professional Self-Assessment

Completing the Computer Science program has changed the way I approach both technology and problem solving. I did not enter this program with the goal of becoming a traditional software developer. My professional background is in construction, and as I progressed through the program, I became more interested in the point where computer science and construction technology meet. My goal is to use technology to improve how work is planned, communicated, tracked, and executed rather than simply develop software for its own sake.

That direction became clearer throughout the program. Courses involving programming, databases, algorithms, artificial intelligence, software development, and security gave me a much stronger technical foundation, but they also changed how I evaluate problems. I have become more deliberate about understanding requirements, separating symptoms from root causes, considering different technical approaches, testing results, and thinking about how a solution will actually be used by the people affected by it.

Those skills directly support the type of work I want to continue pursuing in construction technology, digital workflows, process improvement, and technology implementation.

## Communication and Collaboration

One of the most important things I have learned is that a technically correct solution is not automatically a useful solution. The people using a system may include developers, managers, field personnel, project teams, or other stakeholders with very different levels of technical knowledge. Being able to communicate the same idea differently depending on the audience is part of making the solution successful.

The code review completed for this capstone reinforced that. I had to explain how existing applications worked, identify areas that could be improved, and describe planned enhancements without relying entirely on low-level technical details. That is different from simply writing code because the goal is to make the reasoning understandable to someone else.

I see the same issue in my professional work. Construction technology frequently sits between different groups that do not always view a problem the same way. A project manager may be focused on schedule and cost, a field team may be focused on constructability and getting work installed, and a technical team may be focused on models, data, systems, and standards. A good technical solution has to account for all of those perspectives.

My work has increasingly involved looking at digital construction workflows and finding ways to make information more visible and useful across those groups. That experience has reinforced the value of documenting decisions, establishing clear workflows, and giving stakeholders information they can actually use to make decisions. It is not enough to build a tool. The tool has to fit the people and process around it.

## Technical Problem Solving

The Computer Science program gave me experience with several different approaches to solving technical problems. One of the clearest examples was working with algorithms and artificial intelligence.

In CS 370, I worked with machine learning and neural network concepts in addition to the Treasure Hunt reinforcement learning project that appears later in this portfolio. Other coursework included training and evaluating convolutional neural network models using image datasets such as MNIST and CIFAR-10. Those projects required a different kind of thinking from traditional programming because the result depends not only on the code, but also on the data, model structure, training process, and how performance is evaluated.

The Algorithms and Data Structures enhancement in this portfolio gave me an opportunity to compare that learning-based approach with a traditional search algorithm. I added an A* solver to the Treasure Hunt environment and tested it across 50 valid starting positions. It successfully found the goal in all 50 tests, with an average path length of 15.64 steps, an average of 33.76 nodes explored, and an average search time of approximately 0.000048 seconds.

That comparison helped reinforce an important lesson from the program: there is rarely one universally correct technical approach. Deep Q-learning can learn behavior through repeated interaction, while A* can efficiently calculate a path when the environment is already known. Choosing between approaches requires understanding the problem, available information, performance requirements, and trade-offs involved.

That way of thinking applies well beyond a single algorithm. It is something I expect to use throughout my career when evaluating new technologies and deciding whether a more complex solution actually provides enough value to justify that complexity.

## Software Engineering and Databases

The program also strengthened my understanding of how software systems are structured and how different components work together.

The Travlr Getaways project gave me experience with a full-stack application using MongoDB, Express, Angular, and Node.js. During the capstone, I enhanced that application by adding role-based access control. Instead of treating every authenticated user the same, the application distinguishes between Admin and Editor roles and applies different permissions to each.

The important part of that enhancement was not simply hiding buttons in the interface. Authorization was enforced on the server so that a user could not bypass the interface and perform an action they were not permitted to perform. Testing then verified both authorized and unauthorized operations.

That project strengthened my understanding of software design because it required changes across several layers of the application while preserving existing functionality.

Database work has also become an important part of how I think about computing systems. Earlier coursework introduced relational database concepts and SQL, while CS 340 expanded that experience into MongoDB and application integration.

For the Grazioso Salvare enhancement in this portfolio, I moved beyond basic database filtering and used MongoDB aggregation to turn the existing application into more of a decision-support tool. Rather than simply returning animals that matched a filter, the enhanced system evaluates candidates and classifies them as Basic, Moderate, or Strong matches.

I used MongoDB operations including `$match`, `$addFields`, `$switch`, and `$facet` to perform the evaluation within the database. I intentionally avoided creating arbitrary weighting rules that were not supported by the original rescue criteria. Instead, the scoring remained tied to the existing requirements so the results would be understandable and defensible.

Testing also provided measurable evidence that the enhancement worked across the three rescue categories. The Water Rescue category returned 608 candidates, Mountain Rescue returned 47, and Disaster Rescue returned 36. The enhancement preserved the original Strong Match candidates while adding additional levels of information that could support decision making.

That project helped me see databases as more than storage. When structured correctly, the database layer can perform meaningful processing and provide information that is much closer to what a user actually needs to make a decision.

## Security

Security has also become something I consider much earlier in the design process than I did when I began the program.

The role-based access control enhancement in Travlr is the clearest example in this portfolio. Authentication answers whether a user is who they claim to be, but authorization determines what that user is allowed to do. Separating those concepts was important because an authenticated account should not automatically receive access to every operation in the system.

The Admin and Editor roles apply the principle of least privilege by giving users only the capabilities required for their role. Authorization checks were implemented on the server rather than relying only on the interface. That protects the application even if someone attempts to bypass the front end and interact directly with the API.

More broadly, the program taught me to think about security as part of system design rather than something added after development is complete. Input validation, access control, data protection, testing, and anticipating how a system could be misused all have to be considered when designing software.

That mindset is particularly important as more industries adopt connected systems, cloud platforms, automation, and data-driven tools. A system that improves productivity but exposes sensitive information or grants inappropriate access is not a successful implementation.

## Professional Growth and Direction

The biggest result of completing this program is that I now have a much broader technical foundation to combine with the professional experience I already had.

My interest is not limited to one programming language or one type of application. I am most interested in applying computer science to real operational problems. In construction, that can include digital planning, model-based coordination, workflow automation, data analysis, advanced work packaging, computer vision, robotics, and better integration between the systems used by project teams.

Working in that environment has also shown me that technology implementation is usually as much a people and process problem as it is a technical one. A system can be technically impressive and still fail if the workflow is difficult to understand, the information is unreliable, or the people expected to use it do not see value in it.

The Computer Science program has made me better prepared to operate between those worlds. I can understand the technical side of a system while also thinking about implementation, usability, communication, security, and whether the solution solves the actual business problem.

Long term, I see that direction leading toward operational excellence leadership. I am interested in more than implementing individual technologies or improving one workflow at a time. I want to help develop systems that improve how an organization operates across projects, including areas such as Lean practices, Advanced Work Packaging, process standardization, prefabrication, data use, digital workflows, and continuous improvement. My goal is to combine construction experience, technical knowledge, and organizational leadership to help improve how work is planned and executed at a broader level. Computer science fits into that goal because many of those improvements depend on being able to understand data, evaluate technology, design better systems, and connect technical solutions to real operational needs.

That is the direction I want to continue developing professionally.

## Portfolio Overview

The three artifacts in this portfolio represent different parts of that development.

Travlr Getaways represents **software design and engineering**. The role-based access control enhancement required changes across the application architecture and demonstrated authentication, authorization, server-side security, testing, and software design.

The Treasure Hunt project represents **algorithms and data structures**. Adding A* pathfinding created a measurable comparison between deterministic search and the existing deep Q-learning approach. It demonstrates algorithm selection, performance measurement, testing, and consideration of design trade-offs.

Grazioso Salvare represents **databases**. The MongoDB aggregation enhancement moved the application from simple filtering toward database-driven decision support. It demonstrates data processing, aggregation pipelines, transparent scoring, testing, and the use of database capabilities to provide more useful information to the application.

Together, the three artifacts show more than three separate programming projects. They represent the way my approach to computer science has developed throughout the program: understanding the problem first, choosing an appropriate technical approach, building the solution carefully, testing whether it works, considering security and usability, and communicating the result in a way that other people can understand and use.

That combination is what I plan to carry forward into my work in construction technology and technical leadership.
