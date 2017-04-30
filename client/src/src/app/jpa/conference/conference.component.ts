import {Component, OnInit} from '@angular/core';
import {PrettyXMLPipe} from "../../common/pretty-json/prettyXML.pipe";

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css'],
  providers: [PrettyXMLPipe]
})
export class ConferenceComponent implements OnInit {

  code : string = '';
  codeRight : string = '';
  config : string = '';
  dataJpa : string = '';

  constructor() {}

  ngOnInit() {
    this.code = `
    The REST controller simply asks to the service the data, the Java EE server serializes
    the list of <i>Conference</i> classes in JSON and sends it to the client :
     <pre><code class="java highlight">@Path("/jpa/conference")
public class ConferenceController {
  @Inject
  ConferenceService conferenceService;

  @GET @Produces(MediaType.APPLICATION_JSON)
  public List<<Conference>> getAllConferences(){
  
  return conferenceService.getNextConferenceList();
}}
</code></pre>
`;

this.dataJpa=`The access to the data we create a <b>@Stateless</b> EJB and we inject the <b>@PersistenceContext</b> declared in the <b>/META-INF/persistence.xml</b>.
    We limit the result to maximum 10 results with <i>setMaxResults(10)</i>, using a <b>TypedQuery</b> we can work directly with
    <i>Conference</i> objects.
      Note that we don't have to declare the transaction, the container take care of this for <us></us>:
    <pre><code class="java highlight">@Stateless
    public class ConferenceRepository {

      @PersistenceContext
      private EntityManager entityManager;

      public List<<Conference>> getNextConferenceList() {
      TypedQuery<<Conference>> query = entityManager
        .createQuery(
          "SELECT c FROM Conference c ORDER BY c.begin ASC",
          Conference.class)
        .setMaxResults(10);

      return query.getResultList();
    }</code></pre>`;

    this.codeRight = `
The service class simply asks the data to the repository and transfer it to the REST controller
<pre><code class="java highlight">@Stateless
public class ConferenceService {

    @Inject
    ConferenceRepository conferenceRepository;

    public List<<Conference>> getNextConferenceList () {
        return conferenceRepository.getNextConferenceList();
}}</code></pre>`;

    this.config =`With the information of the persistence.xml file, the container:<br>
 1. define the datasource (configured in the application server)<br>
 2. drop and create the database structure<br>
 3. fill the database with data<br>
 The properties are used to load the data, in an enterprise application you don't need all this configuration.
<pre><code class="xml highlight"><<?xml version="1.0" encoding="UTF-8"?>>
<<persistence version="2.1" xmlns="http://xmlns.jcp.org/xml/ns/persistence"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence
  http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd">>
  <<persistence-unit name="demoPU" transaction-type="JTA">>
    <<jta-data-source>>java:jboss/datasources/DemoDS<</jta-data-source>>
    <<properties>>
      <<property name="javax.persistence.schema-generation.database.action"
        value="drop-and-create"/>>
      <<property name="javax.persistence.schema-generation.create-source"
        value="script"/>>
      <<property name="javax.persistence.schema-generation.create-script-source"
        value="META-INF/sql/create.sql" />>
      <<property name="javax.persistence.sql-load-script-source"
        value="META-INF/sql/data.sql" />>
      <<property name="javax.persistence.schema-generation.drop-source"
        value="script" />>
      <<property name="javax.persistence.schema-generation.drop-script-source"
        value="META-INF/sql/drop.sql" />>
    <</properties>>
  <</persistence-unit>>
<</persistence>></code></pre>`
  }
}
