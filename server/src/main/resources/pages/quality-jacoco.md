# Setup for the coverage analysis

![alt text]([p]BACKEND_URL[/p]/images/sonar-coverage-detail-class.png)

Is the test coverage useful? Yes!

It can be used to evaluate the quality? **False!!!**

Here a couple of quotes from Martin Fowler, you can find his interesting article [here](https://martinfowler.com/bliki/TestCoverage.html):

> _Certainly low coverage numbers, say below half, are a sign of trouble._
> _But high numbers don't necessarily mean much, and lead to ignorance-promoting dashboards._
> _Sufficiency of testing is much more complicated attribute than coverage can answer._

> _I would say you are doing enough testing if the following is true:_
>
> _-You rarely get bugs that escape into production, and_
>
> _-You are rarely hesitant to change some code for fear it will cause production bugs._

Here a couple of quotes from [yegor256](http://www.yegor256.com/2015/06/08/deadly-sins-software-project.html)

> _High coverage is not a guarantee of high quality. That's obvious. But unknown coverage is a clear indicator of maintainability problems._

> _Ideally, test coverage should be checked the same way as static analysis, and the build should fail if it comes out lower than a certain pre-defined threshold (usually somewhere around 80 percent)._

Here we are suggesting a tool that allow you to collect some indications of the state of your project and not to be used to evaluate the quality of it.

A 100% coverage with 0% usefulness is not too difficult to attain. The goal of the coverage is to quickly verify that the critical functions of our code are tested.

If you really need a number as coverage goal it seems that **70-80% of coverage is commonly accepted a good level**.
Under 50% and _over (!)_ 90% are suspicious levels.

## Frontend and backend tests are equals?

In general I would give priority to the backend (Java) tests than the frontend (JavaScript) tests.
There is not a lot of theory in this. It's more an ascertainment of real world projects.

The frontend usually change at a lightning fast speed and has to be updated with the last framework/trend/device, the backend has to be rock solid tend to don't change frequently.

The costs of a frontend error (representation) is not high as an error in the backend (data and business) but the cost to create the frontend tests can be a lot higher than the costs for the backend, in particular during a fullstack development.

The unit tests are more important, my opinion, in the backend. For the frontend are to prioritize other type of tests (we will see this with Selenium).

## SonarQube coverage

After the execution of the tests and the coverage analysis we can access to Sonar directly from Jenkins:

![alt text]([p]BACKEND_URL[/p]/images/sonar_coverage_jenkins.png)

In SonarQube we can see the global coverage ...

![alt text]([p]BACKEND_URL[/p]/images/sonar-coverage-percent.png)

... and the details

![alt text]([p]BACKEND_URL[/p]/images/sonar-coverage-detail.png)
 

## Setup JaCoCo for Jenkins and SonarQube

In the ```<build><plugins>...</plugins></build>``` section of your pom.xml file you have to configure the jacoco plugin:

```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.7.9</version>
    <executions>
        <execution>
            <id>prepare-agent</id>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>prepare-package</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
        <execution>
            <id>post-unit-test</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
            <configuration>
                <!-- Sets the path to the file which contains the execution data. -->
                <dataFile>target/jacoco.exec</dataFile>
                <!-- Sets the output directory for the code coverage report. -->
                <outputDirectory>target/jacoco-ut</outputDirectory>
            </configuration>
        </execution>
    </executions>
    <configuration>
        <systemPropertyVariables>
            <jacoco-agent.destfile>target/jacoco.exec</jacoco-agent.destfile>
        </systemPropertyVariables>
    </configuration>
</plugin>
```
In the profile section of your maven project (backend) you have to add the following profile for sonar:

```xml
<profile>
    <id>coverage-per-test</id>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.13</version>
                <configuration>
                    <properties>
                        <property>
                            <name>listener</name>
                            <value>org.sonar.java.jacoco.JUnitListener</value>
                        </property>
                    </properties>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <dependencies>
        <dependency>
            <groupId>org.sonarsource.java</groupId>
            <artifactId>sonar-jacoco-listeners</artifactId>
            <version>3.8</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    </profile>
```